from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from .serializers import ContactSerializer, InteractionSerializer
from .models import Contact, Interaction
from django.db.models import CharField, Case, When
from string import ascii_uppercase

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        return (
            super().get_queryset()
            .annotate(
                sort_name=Case(
                    When(
                        last_name__exact='',
                        then='first_name'
                    ),
                    default='last_name',
                    output_field=CharField()
                )
            )
            .order_by('sort_name', 'first_name')
        )

    def list(self, request, *args, **kwargs):
        contacts = self.get_queryset()
        grouped_contacts = []

        for letter in ascii_uppercase:
            contacts_with_letter = contacts.filter(sort_name__istartswith=letter)
            if contacts_with_letter.exists():
                serializer = self.get_serializer(contacts_with_letter, many=True)
                grouped_contacts.append({
                    'title': letter,
                    'data': serializer.data
                })

        return Response(grouped_contacts)
    
    @action(detail=False, methods=['post'])
    def import_contacts(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()
    
class InteractionViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all()
    serializer_class = InteractionSerializer
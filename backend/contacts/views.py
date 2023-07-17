from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ContactSerializer
from .models import Contact
from string import ascii_uppercase

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('last_name', 'first_name')
    serializer_class = ContactSerializer

    def list(self, request, *args, **kwargs):
        contacts = self.get_queryset()
        grouped_contacts = []

        for letter in ascii_uppercase:
            contacts_with_letter = contacts.filter(last_name__istartswith=letter)
            if contacts_with_letter:
                serializer = ContactSerializer(contacts_with_letter, many=True, context={'request': request})
                names = serializer.data
                grouped_contacts.append({
                    'title': letter,
                    'data': names
                })

        return Response(grouped_contacts)
from rest_framework import serializers
from .models import Contact, Interaction

class InteractionSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Interaction 
        fields = '__all__'

class ContactSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    interactions = InteractionSerializer(many=True, read_only=True)

    class Meta:
        model = Contact 
        fields = '__all__'
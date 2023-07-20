from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Contact 
        fields = '__all__'
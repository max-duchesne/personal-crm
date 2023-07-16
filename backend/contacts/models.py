from django.db import models

class Contact(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    email = models.EmailField(max_length=254, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=120, blank=True)
    bio = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    company = models.CharField(max_length=60, blank=True)
    title = models.CharField(max_length=60, blank=True)
    birthday = models.DateField(null=True, blank=True)
    linkedin = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.first_name + " " + self.last_name
    
# later can implement a model to track all the times i met with a contact and what we talked about
# will need to add a serializer and viewset for this model and add it to a router (or maybe add a new app for this model)
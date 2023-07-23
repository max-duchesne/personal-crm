from django.db import models

class Contact(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=60, blank=True)
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
    
class Interaction(models.Model):
    INTERACTION_CHOICES = [
        ('email', 'Email'),
        ('call', 'Phone call'),
        ('text', 'Text message'),
        ('meeting_in_person', 'In person meeting'),
        ('meeting_virtual', 'Virtual meeting'),
        ('other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=60, blank=True)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='interactions')
    interaction_type = models.CharField(max_length=50, choices=INTERACTION_CHOICES, null=True, blank=True)
    interaction_date = models.DateTimeField(null=True, blank=True)
    interaction_location = models.CharField(max_length=50, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return str(self.interaction_date) + ": " + self.title
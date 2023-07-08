# Generated by Django 4.2.3 on 2023-07-07 01:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=60)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=120)),
                ('bio', models.TextField(blank=True)),
                ('notes', models.TextField(blank=True)),
                ('company', models.CharField(blank=True, max_length=60)),
                ('title', models.CharField(blank=True, max_length=60)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('linkedin', models.URLField(blank=True)),
            ],
        ),
    ]

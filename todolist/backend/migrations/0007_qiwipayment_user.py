# Generated by Django 4.2.6 on 2023-10-19 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_qiwipayment'),
    ]

    operations = [
        migrations.AddField(
            model_name='qiwipayment',
            name='user',
            field=models.CharField(default=1, max_length=255),
        ),
    ]

# Generated by Django 3.1.3 on 2021-02-08 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0007_auto_20210208_1948'),
    ]

    operations = [
        migrations.AddField(
            model_name='consumer',
            name='bar_code',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
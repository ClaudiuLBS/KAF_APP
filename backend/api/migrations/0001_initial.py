# Generated by Django 4.0.4 on 2022-05-25 20:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Consumer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('username', models.CharField(blank=True, max_length=20)),
                ('silver', models.PositiveSmallIntegerField(default=0)),
                ('gold', models.PositiveSmallIntegerField(default=0)),
                ('rank', models.PositiveIntegerField(default=5)),
                ('rank_progres', models.PositiveSmallIntegerField(default=0)),
                ('silver_required_for_rank', models.PositiveSmallIntegerField(default=10)),
                ('silver_total', models.PositiveSmallIntegerField(default=0)),
                ('silver_required_for_gold', models.PositiveSmallIntegerField(default=9)),
                ('referral_code', models.CharField(default='nimic', max_length=6, unique=True)),
                ('friend_refferal', models.CharField(blank=True, max_length=6)),
                ('friends', models.PositiveIntegerField(default=0)),
                ('gold_made_from_friends', models.PositiveIntegerField(default=0)),
                ('bar_code', models.PositiveIntegerField(default=0)),
                ('gived_one_gold', models.BooleanField(default=False)),
                ('adus_de', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.consumer')),
            ],
        ),
    ]

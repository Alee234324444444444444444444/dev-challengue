# Generated by Django 5.1.3 on 2024-12-01 17:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecoavatar', '0002_post'),
    ]

    operations = [
        migrations.CreateModel(
            name='Desafio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
                ('tipo', models.CharField(choices=[('diario', 'Diario'), ('semanal', 'Semanal')], max_length=10)),
                ('completado', models.BooleanField(default=False)),
                ('fecha_limite', models.DateField(blank=True, null=True)),
                ('usuario', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='desafios', to='ecoavatar.user')),
            ],
        ),
        migrations.CreateModel(
            name='Recompensa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('imagen', models.ImageField(upload_to='recompensas/')),
                ('desafio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recompensas', to='ecoavatar.desafio')),
            ],
        ),
    ]
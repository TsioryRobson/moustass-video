# ADR-03 — Style d’architecture applicative

## Statut
Accepté

## Contexte
La plateforme Moustass Vidéo doit être :
- sécurisée dès la conception,
- scalable,
- observable,
- compatible avec une approche DevSecOps.

Le style d’architecture conditionne la maintenabilité, la sécurité et le déploiement.

## Problème
Faut-il adopter :
- une architecture monolithique,
- ou une architecture microservices ?

## Options envisagées

### Option A — Architecture monolithique
- Application unique regroupant toutes les fonctionnalités.

**Avantages**
- Mise en place initiale plus simple
- Développement local facilité

**Inconvénients**
- Faible isolation des responsabilités
- Scalabilité limitée
- Difficulté à appliquer les principes Zero Trust

### Option B — Architecture microservices
- Services indépendants, chacun responsable d’un domaine métier.
- Services dockerisés et orchestrés via Docker Compose.

**Avantages**
- Séparation claire des responsabilités
- Meilleure isolation de sécurité
- Scalabilité et résilience accrues
- Intégration naturelle avec CI/CD

**Inconvénients**
- Complexité opérationnelle plus élevée
- Communication inter-services à sécuriser

## Décision
L’option B est retenue : **architecture microservices dockerisée**.

## Justification
Ce style d’architecture est aligné avec les objectifs pédagogiques du projet, les exigences de sécurité et les bonnes pratiques industrielles.

## Conséquences
- Chaque service possède son périmètre et son schéma de données.
- Les échanges inter-services doivent être sécurisés.
- Une observabilité globale est nécessaire.

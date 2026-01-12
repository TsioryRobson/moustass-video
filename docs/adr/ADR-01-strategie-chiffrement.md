# ADR-01 — Stratégie de chiffrement des vidéos

## Statut
Accepté

## Contexte
Le système Moustass Vidéo traite des communications vidéo sensibles dans un contexte financier.
Il doit garantir la confidentialité, l’intégrité et l’authenticité des messages vidéo.

Une décision architecturale clé concerne l’emplacement du chiffrement des vidéos.

## Problème
Le chiffrement des vidéos doit-il être réalisé :
- côté client (chiffrement de bout en bout – E2EE),
- ou côté serveur ?

Ce choix a un impact direct sur la sécurité, l’auditabilité, la complexité technique et la faisabilité du MVP.

## Options envisagées

### Option A — Chiffrement de bout en bout (E2EE côté client)
- Les vidéos sont chiffrées avant l’envoi.
- Le serveur n’a jamais accès au contenu en clair.

**Avantages**
- Confidentialité maximale
- Serveur aveugle au contenu

**Inconvénients**
- Gestion des clés complexe
- Audit et conformité plus difficiles
- Complexité accrue côté frontend

### Option B — Chiffrement côté service (serveur)
- Les vidéos sont envoyées via un canal sécurisé.
- Le chiffrement est réalisé par un service backend dédié.

**Avantages**
- Audit et traçabilité facilités
- Gestion centralisée des clés
- Implémentation plus simple pour un MVP

**Inconvénients**
- Confiance requise envers les services backend

## Décision
L’option B est retenue : **chiffrement des vidéos côté service** pour le MVP.

## Justification
Ce choix permet d’équilibrer exigences de sécurité, contraintes académiques et faisabilité technique, tout en assurant une meilleure auditabilité du système.

## Conséquences
- Les vidéos sont chiffrées au repos et en transit.
- Les services backend doivent être fortement sécurisés.
- Une évolution vers l’E2EE pourra être envisagée ultérieurement.

# ADR-02 — Signature et intégrité des vidéos

## Statut
Accepté

## Contexte
Le client exige des garanties fortes concernant :
- l’intégrité des messages vidéo,
- l’authenticité de l’expéditeur,
- la non-répudiation des actions (envoi, lecture).

Un mécanisme de signature numérique est donc nécessaire.

## Problème
Quel mécanisme cryptographique utiliser pour garantir l’intégrité et l’authenticité des vidéos ?

## Options envisagées
- Signature basée sur HMAC
- RSA PKCS#1 v1.5
- RSA-PSS avec SHA-256

## Décision
Le mécanisme retenu est **RSA-PSS avec SHA-256**.

## Justification
- RSA-PSS est recommandé par les standards cryptographiques actuels.
- Il offre une forte résistance aux attaques connues.
- Il permet la non-répudiation grâce à l’usage de clés asymétriques.
- Il est compatible avec les exigences d’audit et de conformité.

## Conséquences
- Un service de gestion des clés est requis.
- Les clés publiques doivent être stockées et tracées.
- La vérification de la signature est obligatoire avant toute lecture de vidéo.

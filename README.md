# 🗺 Zonage ABC des Communes — France 2025

Carte interactive du zonage ABC de toutes les communes françaises, mise à jour avec les données officielles de **l'arrêté du 5 septembre 2025**.

<br>

[![Aperçu de la carte](screenshot.png)](https://lionelgueri.github.io/zonage-abc/)

> 👆 Cliquez sur l'image pour ouvrir la carte interactive

<br>

## Qu'est-ce que le zonage ABC ?

Le **zonage ABC** est un classement officiel des communes françaises selon le **déséquilibre entre l'offre et la demande de logements** (article D304-1 du Code de la construction et de l'habitation). Créé en 2003, il divise le territoire en 5 zones, de la plus tendue (A bis) à la plus détendue (C).

Ce classement est révisé périodiquement par arrêté ministériel pour coller à la réalité des marchés locaux. La **dernière révision date du 5 septembre 2025** : 468 communes ont été reclassées vers une zone plus tendue et 19 déclassées.

### Cas d'usage principaux

| Dispositif | Rôle du zonage |
|------------|---------------|
| **Pinel / Denormandie / Loc'Avantages** | Détermine l'éligibilité à la réduction d'impôt et les plafonds de loyers applicables (zones A bis, A, B1 uniquement depuis 2018) |
| **Prêt à Taux Zéro (PTZ)** | Conditionne l'accès au PTZ dans l'ancien avec travaux (zones B2 et C) et les barèmes applicables |
| **Logement Locatif Intermédiaire (LLI)** | Plafonds de loyers et de ressources fixés selon la zone |
| **Bail Réel Solidaire (BRS)** | Périmètre d'éligibilité et niveaux d'aide indexés sur la zone |
| **Prêt Social Location-Accession (PSLA)** | Barèmes et plafonds définis par zone |

<br>

## Zones représentées

| Couleur | Zone | Description |
|:-------:|------|-------------|
| 🟣 | **A bis** | Paris, 97 autres communes d'Île-de-France (Essonne, Yvelines, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne, Val-d'Oise) et 36 communes en Province (Ain, Alpes-Maritimes, Bouches-du-Rhône, Oise, Haute-Savoie, Var). |
| 🔴 | **A** | Agglomération de Paris (dont zone A bis), Côte d'Azur, agglomération genevoise française, grandes métropoles (Lille, Strasbourg, Lyon, Marseille, Montpellier, Toulouse, Bordeaux, Nantes, Rennes) et 10 communes d'outre-mer à loyers très élevés. |
| 🟠 | **B1** | Grandes agglomérations à loyers élevés, partie de la grande couronne parisienne hors A bis/A, villes tendues de Province, communes d'outre-mer hors zone A. |
| 🟢 | **B2** | Villes-centre de certaines agglomérations, grande couronne parisienne hors A bis/A/B1, communes à loyers assez élevés, Corse hors A/B1. |
| ⚪ | **C** | Reste du territoire. |

Les communes **reclassées** au 5 septembre 2025 sont signalées lors du clic sur la commune.

<br>

## Fonctionnalités

- Carte des **34 875 communes** françaises colorées par zone
- **3 modes d'affichage** via les boutons de l'en-tête :
  - **Zonage 2025** — carte colorée par zone (A bis, A, B1, B2, C)
  - **Évolutions 2025** — communes modifiées par l'arrêté du 5 septembre 2025 (rouge = zone plus tendue, bleu = zone moins tendue)
  - **Évolutions 2024** — communes modifiées par la révision de juillet 2024
- **Recherche** par nom de commune avec affichage de la zone
- **Labels des villes** adaptatifs selon le niveau de zoom
- **Panneau d'information** au clic : nom, département, code INSEE, zone, reclassement (ou évolution avant/après en mode évolution)
- Chargement rapide grâce au format **TopoJSON** pré-calculé (~8 Mo)

<br>

## Sources

| Donnée | Source | Lien |
|--------|--------|------|
| Zonage ABC 2025 | Ministère du Logement — data.gouv.fr | [Télécharger le CSV](https://www.data.gouv.fr/fr/datasets/liste-des-communes-selon-le-zonage-abc/) |
| Contours des communes | OpenDataSoft / IGN — georef-france-commune | [Accéder au dataset](https://public.opendatasoft.com/explore/dataset/georef-france-commune/) |
| Fond de carte & labels | CartoDB (OpenStreetMap contributors) | [carto.com](https://carto.com/) |

<br>

## Structure du projet

```
zonage-abc/
├── index.html                                        # Application web (fichier unique)
├── config.js                                         # Paramètres personnalisables (couleurs, zoom…)
├── data/
│   ├── communes-2025.topo.json                       # Contours + zones fusionnés (TopoJSON ~8 Mo)
│   ├── liste-des-communes-zonage-abc-5-septembre-2025.csv         # Zonage complet 2025
│   ├── liste-des-865-communes-reclassees-abc-juillet-2024.csv     # Évolutions juillet 2024
│   ├── liste-des-468-communes-reclassees-zonage-abc-5-septembre-2025-1-.csv  # Reclassements 2025
│   └── liste-des-19-communes-declassees-zonage-abc-5-septembre-2025.csv      # Déclassements 2025
└── build-data.mjs                                    # Script de régénération des données
```

<br>

## Régénérer les données

Si une mise à jour du zonage est publiée, exécuter dans un terminal :

```bash
node build-data.mjs
```

Ce script télécharge les dernières données et recrée `communes-2025.topo.json`.
*(Nécessite Node.js)*

<br>

---

Réalisé avec [Leaflet](https://leafletjs.com/) · [TopoJSON](https://github.com/topojson/topojson) · [CartoDB](https://carto.com/)

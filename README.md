# 🗺 Zonage ABC des Communes — France 2025

Carte interactive du zonage ABC de toutes les communes françaises, mise à jour avec les données officielles de **l'arrêté du 5 septembre 2025**.

<br>

[![Aperçu de la carte](screenshot.png)](https://lionelgueri.github.io/zonage-abc-2025/)

> 👆 Cliquez sur l'image pour ouvrir la carte interactive

<br>

## Zones représentées

| Couleur | Zone | Description |
|:-------:|------|-------------|
| 🟣 | **A bis** | Agglomération parisienne — tension extrême |
| 🔴 | **A** | Grandes métropoles — forte tension |
| 🟠 | **B1** | Grandes agglomérations et zones chères |
| 🟡 | **B2** | Villes moyennes avec tension modérée |
| ⚪ | **C** | Reste du territoire — marché détendu |

Les communes **reclassées** au 5 septembre 2025 sont signalées lors du clic sur la commune.

<br>

## Fonctionnalités

- Carte des **34 875 communes** françaises colorées par zone
- **Recherche** par nom de commune avec affichage de la zone
- **Labels des villes** adaptatifs selon le niveau de zoom
- **Panneau d'information** au clic : nom, département, code INSEE, zone, reclassement
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
zonage-abc-2025/
├── index.html                                        # Application web (fichier unique)
├── data/
│   ├── communes-2025.topo.json                       # Contours + zones fusionnés (TopoJSON)
│   └── liste-des-communes-zonage-abc-5-septembre-2025.csv   # Données brutes officielles
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

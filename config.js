// ═══════════════════════════════════════════════════════════════
//  config.js — Paramètres de personnalisation de la carte
//
//  C'est ici que tu modifies couleurs, zoom, opacité, etc.
//  Pas besoin de toucher à index.html pour ces réglages.
//
//  Comment modifier : ouvre ce fichier sur GitHub (icône crayon ✏️),
//  change la valeur souhaitée, puis "Commit changes".
// ═══════════════════════════════════════════════════════════════

const CONFIG = {

  // ── Carte ────────────────────────────────────────────────────
  carte: {
    centre:        [46.5, 2.3],  // [latitude, longitude] du centre au démarrage
    zoomInitial:   6,             // zoom de départ  (5 = France entière, 8 = région)
    zoomMinLabels: 6,             // zoom minimum pour afficher les noms de villes
  },

  // ── Couleurs des zones ────────────────────────────────────────
  // fill   = couleur de remplissage de la commune
  // stroke = couleur de la bordure entre communes
  // label  = texte affiché dans la légende et le panneau d'info
  zones: {
    'Abis': { fill: '#9800E7', stroke: '#7000ab', label: 'Zone A bis' },
    'A':    { fill: '#F10000', stroke: '#b50000', label: 'Zone A'     },
    'B1':   { fill: '#FFA600', stroke: '#c07d00', label: 'Zone B1'    },
    'B2':   { fill: '#ABE300', stroke: '#7faa00', label: 'Zone B2'    },
    'C':    { fill: '#FFFFFF', stroke: '#cccccc', label: 'Zone C'     },
  },

  // ── Opacités ─────────────────────────────────────────────────
  opaciteZones: 0.78,  // transparence des communes  (0 = invisible, 1 = plein)
  opaciteFond:  0.40,  // transparence du fond de carte gris (0 = blanc pur)

  // ── Données ──────────────────────────────────────────────────
  // Chemin vers le fichier TopoJSON (ne modifier que si vous renommez le fichier)
  fichierDonnees: './data/communes-2025.topo.json',

};

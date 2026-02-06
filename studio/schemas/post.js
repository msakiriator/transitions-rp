export default {
    name: 'post',
    title: 'Actualités',
    type: 'document',
    fields: [
      { name: 'title', title: 'Titre', type: 'string' },
      { name: 'author', title: 'Auteur', type: 'string'},
      { name: 'slug', title: 'URL (Slug)', type: 'slug', options: { source: 'title' } },
      { name: 'publishedAt', title: 'Date de publication', type: 'datetime' },
      { 
        name: 'category', 
        title: 'Catégorie', 
        type: 'string',
        options: { list: ['Mise à jour', 'Univers', 'Règles', 'Annonces', 'Partenaires', 'Autres'] }
      },
      { name: 'content', title: 'Contenu', type: 'array', of: [{ type: 'block' }] },
      { name: 'author', title: 'Auteur', type: 'string', initialValue: "Transitions" }
    ]
  }
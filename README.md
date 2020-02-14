# frontend-AllezCine
Créer un ONEPAGER en tant que projet front-end final - BeCode 02/2020  
[GitHub Page](https://j-pard.github.io/frontend-AllezCine)

## 1. Description :
Le projet consiste à recréer un site selon un [layout fourni](https://github.com/j-pard/frontend-AllezCine/blob/master/ressources/layout.jpg).    
Nous utilisons l'API de [The Movie DB](https://www.themoviedb.org/) pour receuillir toutes les informations relatives aux films.  
  
Durée du projet: 5 jours.
[Consignes](https://github.com/becodeorg/CRL-Keller-1-18/blob/master/Projects/3.AllezCine/readme.md)

## 2. Auteurs :
* [Jonathan PARDONS](https://github.com/j-pard) : Structure, gestion de l'API et incrémentation des templates.  
* [Lloyd COLART](https://github.com/Lloydcol) : Développement Front-end et intégration de Bootstrap.  
  
## 3. Technologies :
* HTML 5: Structure sémantique.
* SASS: Styling, micro UX & partials.
* Javascript: Utilisations de la norme *ES6* & *Async Await*.
* Bootstrap 4: Grid system et fonctions intégrées comme les *modals* et *caroussel*.  
  
## 4. Méthodes :
* Equipe :
  * Debrief en début de journée pour résumer les avancements de la veille et de la soirée: 15min.
  * Merge général sur la branche *DEV* ensemble pour repartir sur une base commune **à jour**: 15min.
  * Répartition des tâches de la journée.
  * Durant la journée, plusieurs *remise en commun* sont éffectuées pour vérifier l'avancement et la direction de chacun.
* App :
  * Une fonction générale module les appels de l'API en fonction de ses paramètres pour créer les affiches de films et les intégrées à la page. Cette méthode nous permet d'avoir un site toujours à jour avec les nouveautés.
  * Les valeurs de l'API sont rechargées à chaque chargement de la page.
  * Bootstrap nous permet de gérer facilement le *responsive design*.
  * Chaque affiche contient toutes les informations du film, sous forme d'*objet*. Au click, le trailer se lance dans YouTube.
* Outils :
  * GitHub
  * Commands.md: recentrer les commandes, les couleurs, etc utilisées pour l'ensemble du projet.
  * Kanban: Suivi en direct des avancements et des objectifs.
  * Pencil: Mock-Up fait en commun pour arranger la sémantique et distribuer les tâches.

## 5. Project Status :
* Front-End est terminé pour une version fonctionnelle du site. Mais il est encore possible d'y ajouter des détails pour améliorer l'expérience utilisateur..  
Il est prévu d'y revenir prochainement.  
  
* Back-End: PHP et les bases de données ne font pas encore partie du projet. Les formulaires sont fictifs.

* Divers: 
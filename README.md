# nodejs-fileupload-vuln



App nod js qui upload un fichier

- server -> aucune sécu passe n'importe quoi
- server -> sécu qui laisse passer seulement les images

ce qui fonctionne:

- Premier server on peut injecter un fichier HTML qui lance un scripte cotes client
- Le second server peut faire passer un fichier avec une double extension

Difficulté:

- Fonctionne plus sur les dernières mises à jour d’Internet Explorer ("ActiveXObject").
- On ne peut modifier le file double extension via burp car cela ce produit cotes server.

Par la suite :

- Chercher comment exploiter une faille cotes server


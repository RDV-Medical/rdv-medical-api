# Documentation

## Git 
…or create a new repository on the command line

echo "# rdv-medical-api" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/RDV-Medical/rdv-medical-api.git
git push -u origin main

…or push an existing repository from the command line

git remote add origin https://github.com/RDV-Medical/rdv-medical-api.git
git branch -M main
git push -u origin main
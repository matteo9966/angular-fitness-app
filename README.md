# ANGULAR FITNESS APP 

this app uses Angular material

### Angular material theming guide for this app:
Use angular material theming sistem to generate the colors etc for this app:
-  everytime you use a material component remember to include the component <component>-color and <component>-theme inside the thimify-mat-component function
-  app/styles/material/themes define the material palette: define the palette using the scss map with a primary and contrast
-  call the create-material-theme-from-palette and pass it the primary and accent, optionally warn palette. 
-  app/styles/themes define inside here the themes using the themify-mat-components function
-  import the theme you created inside the styles.scss folder (Ideally you should lazy load the style from the code);  
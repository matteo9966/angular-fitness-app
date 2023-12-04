# ANGULAR FITNESS APP 

This is a demo application created using Angular v.16, firebase firestore, and angular material.
It uses angular's new feature `Signals` as a state management system.


### Angular material theming guide for this app:
Use angular material theming sistem to generate the colors etc for this app:
-  everytime you use a material component remember to include the component <component>-color and <component>-theme inside the thimify-mat-component function
-  app/styles/material/themes define the material palette: define the palette using the scss map with a primary and contrast
-  call the create-material-theme-from-palette and pass it the primary and accent, optionally warn palette. 
-  app/styles/themes define inside here the themes using the themify-mat-components function
-  import the theme you created inside the styles.scss folder (Ideally you should lazy load the style from the code);  
  

  # Review-Form
  - using a view model logic pattern for a template driven form : only need to use one way binding and keep form state in sync using valueChanges
  - 
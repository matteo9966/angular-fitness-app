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
  

## FORMS
Recently started exploring on Template Driven forms.
Surprisingly they work much better. Ward Bell convinced me to switch to Template driven forms.
You can see an example of the usage in the "contact us" form.

Two great posts on t-d-forms:

https://timdeschryver.dev/blog/a-practical-guide-to-angular-template-driven-forms#injecting-the-control-container
https://medium.com/@a.yurich.zuev/angular-nested-template-driven-form-4a3de2042475


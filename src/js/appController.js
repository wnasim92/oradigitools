/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function (oj, ko) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'home': { label: 'Home', isDefault: true },
        'welcome': { label: 'Welcome' },
        'cloudhubs': { label: 'Cloud Hubs' },
        'profileslist': { label: 'SE Faces' },
        'profiledetails': { label: 'ProfileDetails' },
        'catalogs': { label: 'SEaaS Catalog'},
        'assets': { label: 'Assets' },
        'performance': { label: 'Performance' }
      });

      //welcome,cloud hubs, profiles,catalogs, assets, performance
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
        { name: 'Home', id: 'home' },

        { name: 'SE Faces', id: 'profileslist' },
        { name: 'SEaaS Catalog', id: 'catalogs' ,'oj-disabled': 'disabled'},
        { name: 'Assets', id: 'assets','oj-disabled': 'disabled' },
        { name: 'Perfomances', id: 'performance','oj-disabled': 'disabled' }
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, { idAttribute: 'id' });

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () { oj.OffcanvasUtils.close(self.drawerParams); });
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function () { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('Sitemap', 'sitemap', '#'),
		new footerLink('Terms of Use & Privacy', 'terms', '#'),
		new footerLink('Cookie Preferences', 'cookie', '#'),
        new footerLink('Contact Us', 'contactUs', '#')

      ]);
    }

    return new ControllerViewModel();
  }
);

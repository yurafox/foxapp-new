import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AbstractDataRepository} from "./service/index";
import {
  // AboutPage,
  AccountPage,
  HomePage,
  SupportPage,
  LoginPage,
  CategoriesPage,
  MapPage
} from '../pages/index';
import {ComponentBase} from "../components/component-extension/component-base";
// import {ScreenOrientation} from "@ionic-native/screen-orientation";

export interface PageInterface {
  title: string;
  name?: string;
  component: any;
  icon?: string;
  index?: number;
}

declare var ExoPlayer: any;

@Component({
  templateUrl: 'app.html'
})
export class FoxApp extends ComponentBase {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  readonly LOCAL_VIDEO_URL = 'file:///android_asset/www/assets/video/'; // Default path if file located in assets/video
  videoFileName = 'promo';  // Set the name of video file

  appPages = [
    {title: 'Главная', name: 'Home', component: HomePage, index: 0, icon: 'ios-home-outline'},
    {title: 'Категории', name: 'Categories', component: CategoriesPage, index: 1, icon: 'ios-list-outline'},
    /*{title: 'Ваши Заказы', name: 'Orders', component: MyOrderPage, index: 2, icon: 'ios-cart-outline'},*/
    {title: 'Профиль', name: 'Account', component: AccountPage, index: 3, icon: 'ios-person-outline'},
  ];
  infoPages = [
    {title: 'Магазины на карте', name: 'Map', component: MapPage, index: 0, icon: 'ios-map-outline'},
    {title: 'О нас', name: 'About', /*component: AboutPage,*/ index: 1, icon: 'ios-information-circle-outline'},
    {title: 'Поддержка', name: 'Support', component: SupportPage, index: 2, icon: 'ios-text-outline'}
  ];

  constructor(private platform: Platform, statusBar: StatusBar,
              private splashScreen: SplashScreen, public menuCtrl: MenuController,
              private repo: AbstractDataRepository/*, private screenOrientation: ScreenOrientation*/) {
    super();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
    });
  }

  ionViewDidLoad() {
  }

  async ngOnInit() {
    super.ngOnInit();
    if (!this.userService.isAuth && this.userService.isNotSignOutSelf()) {
      await this.userService.shortLogin();
    }
  }

  openPage(page: PageInterface) {

    if ((this.userService.isAuth === false) && (page.component === AccountPage)) {
      this.nav.push(LoginPage).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    } else {
      switch (page.name) {
        case 'Home': {
          this.nav.setRoot(HomePage).catch((err: any) => {
            console.log(`Didn't set nav root: ${err}`);
          });
          break;
        }
        case 'About': {
          try {
            this.playVideo();
          } catch(err) {
            console.log(err);
          }
          break;
        }
        default: {
          this.nav.push(page.component).catch((err: any) => {
            console.log(`Didn't set nav root: ${err}`);
          });
          break;
        }
      }
      /*this.nav.push(page.component).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });*/
    }

    /*if (page.name === 'About') {
      this.playVideo();
    }*/
  }

  signOut() {
    this.userService.logOut();
    this.nav.setRoot(HomePage);
    this.menuCtrl.close();
  }

  // To play video when device is ready
  playVideo() {
    this.platform.ready().then(() => {
      // Locking screen orientation
      /*this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY).then(() => {
        console.log('locked');
      }).catch(e => {
        console.log('error locking: ' + e);
      });*/
      // ExoPlayer
      this.playExoPlayer();
    }).catch(err => {
      console.log('Error occurred: ' + err);
    });
  }

  // Function to play Google's ExoPlayer
  playExoPlayer() {
    let successCallback = json => {
      // console.log(json.eventType);
      /*if (json.eventType === 'KEY_EVENT') {
        console.log('action: ' + json.eventAction);
        console.log('keycode: ' + json.eventKeycode);
      }*/
      // Exit player on phones BACK button
      if (json.eventType === 'KEY_EVENT' && json.eventKeycode === 'KEYCODE_BACK') {
        ExoPlayer.close();
      };
      // Show controls on tap on the screen
      if (json.eventType === 'TOUCH_EVENT' && json.eventAction === 'ACTION_UP') {
        ExoPlayer.showController();
      };
      // Play video again (from 0 ms) if it ended
      if (json.eventType === 'STATE_CHANGED_EVENT') {
        // console.log('state: ' + JSON.stringify(json));
        if (/*json.playbackState === 'STATE_ENDED'*/ json.position >= (json.duration - 1)) {
          ExoPlayer.seekTo(0);
        }
      }
    };
    let errorCallback = error => {
      console.log(error);
    };
    // Parameters for player
    let params = {
      url: this.LOCAL_VIDEO_URL + this.videoFileName + '.mp4',
      userAgent: 'FoxPlayer', // default is 'ExoPlayerPlugin'
      aspectRatio: 'FIT_SCREEN', // default is FIT_SCREEN
      hideTimeout: 3000, // Hide controls after this many milliseconds, default is 5 sec
      autoPlay: true, // When set to false stream will not automatically start
      // seekTo: 10 * 60 * 60 * 1000, // Start playback 10 minutes into video specified in ms, default is 0
      forwardTime: 60 * 1000, // Amount of time in ms to use when skipping forward, default is 1 min
      rewindTime: 60 * 1000, // Amount of time in ms to use when skipping backward, default is 1 min
      // audioOnly: true, // Only play audio in the backgroud, default is false.
      // subtitleUrl: 'http://url.to/subtitle.srt', // Optional subtitle url
      // connectTimeout: 1000, // okhttp connect timeout in ms (default is 0)
      // readTimeout: 1000, // okhttp read timeout in ms (default is 0)
      // writeTimeout: 1000, // okhttp write timeout in ms (default is 0)
      // pingInterval: 1000, // okhttp socket ping interval in ms (default is 0 or disabled)
      // retryCount: 5, // number of times datasource will retry the stream before giving up (default is 3)
      controller: { // If this object is not present controller will not be visible
        // streamImage: 'http://url.to/channel.png',
        // streamTitle: 'Cool channel / movie',
        // streamDescription: '2nd line you can use to display whatever you want like current program epg or movie description',
        hideProgress: false, // Hide entire progress timebar
        hidePosition: false, // If timebar is visible hide current position from it
        hideDuration: false, // If timebar is visible Hide stream duration from it
        controlIcons: {}
      }
    };
    // Start player
    ExoPlayer.show(params, successCallback, errorCallback);
  }
}


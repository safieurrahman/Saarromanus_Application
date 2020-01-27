###### HOW TO BUILD THE SMARTPHONE APPS


# SAARROMANUS SMARTPHONE APPS
### BUILD INSTRUCTION
---
***
![alt text](https://i.ibb.co/TrVkfg5/cover.jpg)
---
***

### _Latest APK_
---
To download the latest build of the `apk` [click here](Saarromanus.apk).

### _ENVIRONMENT SETUP_
---
To setup the build environment, we first need to download **Node.js** as the apps are developed using `react-native`.

Node.js can be download from their official website. [This page](https://nodejs.org/en/download/) lists the latest and LTS version of the node software for all the popular operating systems. Node.js also comes with node package manager (`npm`). To check everything is installed properly one can run the following command from a terminal/powershell/cmd:
```bash
npm -v
```
If `node` and `npm` are installed properly, this command will show the installed npm version.

---


Once `node` and `npm` are installed, we have to install `expo`. `expo` adds one more layer to `react-native` and helps to get started and manage the project without investing too much time. The following command installs `expo`:
```bash
npm install -g expo-cli
```
To use `expo` one requires an `expo` account which can be created from the `expo` [website](https://expo.io/signup).

---

---
---
### _Requirements_
---
---
As the Saarromanus smaprthopne app uses Google Map, one will also need a Google Map API key to successfully run the app. Without the API key whenever anyone goes to the page that has map, the app will crash and exit.

##### Get the API key

---
**To get an API key:**

1. Visit the Google [Cloud Platform Console](https://cloud.google.com/console/google/maps-apis/overview).
2. Click the project drop-down and select or create the project for which you want to add an API key.
3. Click the menu button ![menu button](https://developers.google.com/maps/documentation/images/nav-menu.png)  and select **APIs & Services > Credentials**.
4. On the Credentials page, click **Create credentials > API key**.
5. The API key created dialog displays your newly created API key.
6. Click Close.
7. The new API key is listed on the Credentials page under API keys.
(Just to build the app, there is no need to restrict the key)

Once we have the API key, we need to add it in our `app.json` file.

The `app.json` file can be found in the follwoing path inside the project:
`SmartphoneApps/Saarromanus/app.json`
Inside `app.json` there is a field calld `"android"` at the end of the file. We have to place our key in that field. The field path is:
`"android" > "config" > "googleMaps" > "apiKey"`
The section will look like the following once the API key is placed there:
```json
	"android": {
		"package": "com.se.saarromanus",
		"config": {
			"googleMaps": {
				"apiKey": "YOUR_NEWLY_CREATED_API_KEY_WILL_GO_HERE"
			}
		}
	}
```
---
### _Building The App_
With `node`, `npm`, `expo-cli` being installed and `expo` account & Google Map API key is being created, we are just two steps away to build the app. One is to install the app dependencies.

To install all the dependencies, we have to open a terminal/command prompt/powershell inside the `Saarromanus` (path: `SmartphoneApps/Saarromanus/`) folder or we can also `cd` into that folder. Once we are inside `Saarromanus` folder in our terminal, we just need to run the following command to install all the dependencies:
```shell
npm i
```
* *If it complains that it can not find any `package.json` file, it means we are not inside the `Saarromanus` folder*
* *It is perfectly ok to get some warnings (`WARN`) during the dependency installation as long as there is no error (`ERR`)*

The next step is to sign in using our expo account. To sign in we will use the follwing command:
```shell
expo login
```
This will ask for username and password. We have use the ones we used to create the expo account.
* *Please note, in some terminal/command-promt, password will not be visible at all. Not even as \* . Just hit enter once you are done typing the password*

We are now completely ready to run/build our app.

Here is a list of some basic commands (All of these commands should be executed form `Saarromanus` folder):

##### Run App In Development Mode:
---
```
expo start
```
This will lunch a webpage in the browser. We can connect an android/ios device/emulator and select run on android/ios from the lunched webpage to run the app in our device. To run the app on physical device, we also need to download and install the `Expo` app from playstore/app-store.
* IOS client: https://apps.apple.com/de/app/expo-client/id982107779?l=en
* Android client: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en

##### Build Android APK:
---

```
expo build:android
```
While building for android `expo` will ask for `keystore`. [This documentation page](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/) tells more about this and also links a Google's documentation page on `keystore`. For simplicity, it is ok, if we let `expo` to manage our keystore.

##### Build Android iOS:
---
```
expo build:ios
```
For iOS `expo` will ask for `Distribution Certificate`. The `keystore` page also talks about this. Here also we can let `expo` to manage it for us.

Once the building is done, it will provide a link in the terminal which can be used to download the android or ios build. Or we can login to our expo account to download the build and also to monitor build status.

### _App Store Submission_
Once the binaries (`.apk` / `.ipa`) are built, we can easily submit to the respective app store by following the provided instruciton page.

##### Submit To Google Play Store
---
| Source        | Link      |
|:-------------:|:---------:|
|Official       | https://support.google.com/googleplay/android-developer/answer/113469?hl=en |
|Unofficial    |https://instabug.com/blog/how-to-submit-your-app-to-the-google-play-store/ |

##### Submit To Apple App Store
---
| Source        | Link      |
|:-------------:|:---------:|
|Official       | https://help.apple.com/app-store-connect/#/dev34e9bbb5a |
|Unofficial    | https://support.mobincube.com/hc/en-us/articles/201068598-How-to-deliver-your-IPA-file-to-AppStore |

---
***

LICENSE
# SAARROMANUS CONTENT MANAGEMENT SYSTEM (CMS)
### BUILD INSTRUCTION
---
Please read the CMS build instruction [here](Manuals)

---
***

# LICENSE
Saarromanus project is [MIT licensed](LICENSE).

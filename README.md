# E-Scooter Reporter App

**Built in [React Native](https://reactnative.dev) using [Expo](https://expo.io)**

![app icon](escooter_app_Native_Expo/assets/app_icon/app_icon_rounded.png)

## By Group 1

**Albert Bethlowsky Rovsing**,
[arov@itu.dk](mailto:arov@itu.dk)

**Christoffer Ry Mouritzen**,
[cmou@itu.dk](mailto:cmou@itu.dk)

**Julie Astrid Schelhart Madsen**,
[juam@itu.dk](mailto:juam@itu.dk)

**Gabriel Brodersen**,
[gbro@itu.dk](mailto:gbro@itu.dk)

## How To Run

Make sure you have [Expo](https://expo.io) installed

Change directory to the project folder

```Shell
cd /escooter_app_Native_Expo/
```

Install Modules

```Shell
npm install
```

Run Expo

```Shell
expo start
```

Use the QR code displayed in the terminal to view the app

## Data Model

### Firebase Firestore – *(NoSQL)*

`reports`

- `broken` **boolean**
  - *example: false*
- `comment` **string**
  - *example: "I see a pile of scooters!"*
- `geolocation` **geolocation**
  - *example [55.660572° N, 12.590942° E]*
- `image` **string**
  - *example: "image1"*
- `laying` **boolean**
  - *example: true*
- `misplaced` **boolean**
  - *example: false*
- `other` **boolean**
  - *example: true*
- `qr` **string**
  - *example: "<https://lime.bike/bc/v1/VYCHMVA=>"*
- `timestamp`(timestamp)
  - *example: October 31, 2020 at 12:59:59 PM UTC+1*
- `user` **string**
  - *example: "gbro@itu.dk"*

`users`

- `email` **string**
  - *example: "gbro@itu.dk"*
- `password` **string**
  - *example: abcd1234!*
- `profile_image` **string**
  - *example: "profileimage1.png"*

### Firebase Storage – *file storage*

- `/scooter_photos` **files**
  - *example: image1.png*
- `/profile_images` **files**
  - *example: profileimage1.png*

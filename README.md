# E-Scooter Reporter App

**Built in [React Native](https://reactnative.dev) using [Expo](https://expo.io)**

![app icon](assets/app_icon/app_icon_rounded.png)

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

Make sure you have [Expo](https://expo.io) & [Node.js](https://nodejs.org/) installed

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

### Firebase Firestore – _(NoSQL)_

`reports`

- `broken` **boolean**
  - _example: false_
- `comment` **string**
  - _example: "I see a pile of scooters!"_
- `geolocation` **geolocation**
  - _example [55.660572° N, 12.590942° E]_
- `image` **string**
  - _example: "image1"_
- `laying` **boolean**
  - _example: true_
- `misplaced` **boolean**
  - _example: false_
- `other` **boolean**
  - _example: true_
- `qr` **string**
  - _example: "<https://lime.bike/bc/v1/VYCHMVA=>"_
- `timestamp`(timestamp)
  - _example: October 31, 2020 at 12:59:59 PM UTC+1_
- `user` **string**
  - _example: "gbro@itu.dk"_

`users`

- `email` **string**
  - _example: "gbro@itu.dk"_
- `password` **string**
  - _example: abcd1234!_
- `profile_image` **string**
  - _example: "profileimage1.png"_

### Firebase Storage – _file storage_

- `/scooter_photos` **files**
  - _example: image1.png_
- `/profile_images` **files**
  - _example: profileimage1.png_

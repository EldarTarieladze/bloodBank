const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = require("../../models/UserSchema");

const CheckUser = require("./../../middlewares/CheckUser");

let user = {};
const env = require("./../../../env.json");

// const CheckUser = require("./../../middlewares/CheckUser");
const EventsSchema = require("./../../models/EventsSchema");

router.route("/top").post(async (req, res) => {
  await EventsSchema.findOne({}).then((response) => {});
});

module.exports = router;

// CREATE EVENTS
// router.route("/all/:id").get(async (req, res) => {

//     EventsSchema.findOne({}).then((result) => {
//       if (result) {
//         if (req.params.id == "sportEvent") {
//           const data = [];
//           result.sportEvents.map((item) => {
//             data.push(item);
//           });
//           res.json({ data });
//         }
//       }
//     });
//   });
router
  .route("/deletefavourite")
  .all(CheckUser)
  .post((req, res) => {
    try {
      UserSchema.findOneAndUpdate(
        { email: req.email },
        { $pull: { myFavourites: { eventId: req.body.id } } },
        { new: true },
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      ).then(result => {
        res.json({data: result.myFavourites, success: true})
      })
    } catch (error) {
      res.json({ error: error });
    }
  });

router
  .route("/getfavourites")
  .all(CheckUser)
  .post((req, res) => {
    try {
      UserSchema.findOne({ email: req.email }).then(async (result) => {
        if (result) {
          res.json({ data: result.myFavourites, success: true });
        } else {
          res.json({ msg: "მომხმარებელი არ არსებობს", success: false });
        }
      });
    } catch (error) {
      res.json({ error: error });
    }
  });
router
  .route("/addfavourite")
  .all(CheckUser)
  .post(async (req, res) => {
    try {
      const card = req.body.data;
      UserSchema.findOne({ email: req.email }).then(async (result) => {
        if (result) {
          let isInFavourites = false;
          result.myFavourites.map((item) => {
            if (item.eventId == card.eventId) {
              isInFavourites = true;
            }
          });
          if (!isInFavourites) {
            result.myFavourites.push({
              eventId: card.eventId,
              titleGeo: card.titleGeo,
              titleEng: card.titleEng,
              titleRu: card.titleRu,
              groupName: card.groupName,
              smallImage: card.smallImage,
              mediumImage: card.mediumImage,
              image: card.image,
              startedAt: card.startedAt,
              sellStartedAt: card.sellStartedAt,
              descriptionGeo: card.descriptionGeo,
              descriptionEng: card.descriptionEng,
              descriptionRu: card.descriptionRu,
              locationGeo: card.locationGeo,
              locationEng: card.locationEng,
              locationRu: card.locationRu,
              adressGeo: card.adressGeo,
              adressEng: card.adressEng,
              adressRu: card.adressRu,
              price: card.price,
              status: card.status,
            });
            await result.save().then((r) => {
              res.json({ msg: "სიახლე დაემატა ფავორიტებში", success: true });
            });
          } else {
            res.json({ msg: "ეს სიახლე უკვე ფავორიტებშია", success: false });
          }
        } else {
          res.json({ msg: "მომხმარებელი არ არსებობს", success: false });
        }
      });
    } catch (error) {
      res.json({ error: error });
    }
  });
router.route("/:id").get(async (req, res) => {
  EventsSchema.findOne({}).then((result) => {
    if (result) {
      if (req.params.id == "sportEvent") {
        const data = [];
        result.sportEvents.map((item) => {
          data.push(item);
        });
        res.json({ data });
      }
    }
  });
});
router.route("/createsportevent").get(async (req, res) => {
  EventsSchema.findOne({}).then(async (result) => {
    result.sportEvents.push({
      eventId: 1,
      titleGeo: "რაგბი I საქართველო - შოტლანდია",
      titleEng: "1event",
      titleRu: "1cобытия",
      groupName: "sportEvent",
      smallImage:
        "https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg",
      mediumImage:
        "https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg",
      image:
        "https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg",
      startedAt: "01/12/2021",
      sellStartedAt: "05/12/2021",
      descriptionGeo: "აღწერაGeo",
      descriptionEng: "აღწერაEng",
      descriptionRu: "აღწერაRu",
      locationGeo: "თბილისი",
      locationEng: "TbilisEng",
      locationRu: "TbilisiRu",
      adressGeo: "დინამო არენა",
      adressEng: "dinamo arena",
      adressRu: "dinamo arenaRu",
      price: 40,
      status: true,
    });
    await result.save();
    res.json("success");
  });
  // EventsSchema.findOne({}).then(result => {
  //     result.sportEvents.push({
  //         eventId: 4,
  //         titleGeo: '4ივენთი',
  //         titleEng: '4event',
  //         titleRu: '4события',
  //         groupName: 'sportEvent',
  //         smallImage: 'https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg',
  //         mediumImage: 'https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg',
  //         image: 'https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg',
  //         startedAt: '03/11/2021',
  //         sellStartedAt: '02/11/2021',
  //         descriptionGeo: 'აღწერაGeo',
  //         descriptionEng: 'აღწერაEng',
  //         descriptionRu: 'აღწერაRu',
  //         location: 'Batumi',
  //         adressGeo: 'chavchavadze 59Geo',
  //         adressEng: 'chavchavadze 59Eng',
  //         adressRu: 'chavchavadze 59Ru',
  //         price: '5 - 25',
  //         status: true,
  //     })
  // result.topEvents.push({
  //         eventId: 4,
  //         titleGeo: '4ივენთი',
  //         titleEng: '4event',
  //         titleRu: '4события',
  //         groupName: 'sportEvent',
  //         smallImage: 'https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg',
  //         mediumImage: 'https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg',
  //         image: 'https://tkt-static.lemon.do/img/c25272aa-fe70-4bce-bd9c-348a747f7999.jpeg',
  // })
  //     result.save();
  // })
});

router.route("/top").get((req, res) => {
  EventsSchema.findOne({}).then((result) => {
    res.json(result.topEvents);
  });
});

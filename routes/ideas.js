const express = require("express");
const router = express.Router();
const { Idea } = require("../models/Idea");
const { ensureAuthenticated } = require("../helper/auth");
//route for Adding an idea
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("ideas/add");
});

// get the edit form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if (idea.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      res.redirect("/ideas");
    } else {
      res.render("ideas/edit", {
        idea
      });
    }
  });
});

// fetch all ideas
router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({
    user: req.user.id
  })
    .sort({
      date: "desc"
    })
    .then(ideas => {
      res.render("ideas/all", {
        ideas
      });
    })
    .catch(err => {
      console.log(err);
    });

  //process form for adding ideas
  router.post("/", ensureAuthenticated, (req, res) => {
    new Idea({
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    })
      .save()
      .then(idea => {
        res.redirect("/ideas");
      })
      .catch(e => {
        console.log(`Encountered this error: ${e}`);
      });
  });

  //edit the idea
  router.put("/:id", ensureAuthenticated, (req, res) => {
    Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          details: req.body.details
        }
      },
      {
        new: true
      }
    ).then(idea => {
      res.redirect("/ideas");
    });
  });
  //delete an idea
  router.delete("/:id", ensureAuthenticated, (req, res) => {
    Idea.findByIdAndRemove(req.params.id)
      .then(idea => {
        req.flash("success_msg", "Story deleted");
        res.redirect("/ideas");
      })
      .catch(error => {
        res.send("Unable to delete");
      });
  });
});

module.exports = router;

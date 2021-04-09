const express = require("express");
const path = require("path");
const { isWebUri } = require("valid-url");
const { requireAuth } = require("../middleware/jwtAuthMW");
const dashboardService = require("../services/dashboardService");
// Cloudinary
const cloudinary = require("cloudinary");
const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../config").APIS.CLOUDINARY;
const formData = require("express-form-data");

async function checkForPrivateCards(req, res, next) {
  try {
    const cards = await dashboardService.getPrivateCards(
      req.app.get("db"),
      req.params.user_id
    );
    if (cards.length === 0)
      return res
        .status(404)
        .json({ error: "This user has no private cards at the moment." });

    res.cards = cards;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkCardStillPrivate(req, res, next) {
  try {
    const card = await dashboardService.getPrivateById(
      req.app.get("db"),
      req.params.user_id,
      req.params.card_id
    );
    if (card.length === 0)
      return res.status(404).json({
        error: `This card is no longer private. It might have been deleted or made public.`,
      });

    res.card = card;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = privateRouter;

const Clinic = require("../model/Clinic");

exports.createClinic = async (req, res) => {
  try {
    const {
      name,
      type,
      image,
      address,
      phone,
      openTime,
      closeTime,
      homeCollection,
      lat,
      lng,
    } = req.body;

    if (!name || !address || lat === undefined || lng === undefined) {
      return res
        .status(400)
        .json({ message: "Name, address, lat and lng are required" });
    }

    const latitude = Number(lat);
    const longitude = Number(lng);
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      return res
        .status(400)
        .json({ message: "lat must be between -90 and 90" });
    }
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return res
        .status(400)
        .json({ message: "lng must be between -180 and 180" });
    }

    const exists = await Clinic.findOne({ name, address });
    if (exists) {
      return res.status(409).json({ message: "This clinic already exists" });
    }

    const clinic = await Clinic.create({
      name,
      type,
      image,
      address,
      phone,
      openTime,
      closeTime,
      homeCollection,
      lat: latitude,
      lng: longitude,
    });

    res.status(201).json({ message: "Clinic registered successfully", clinic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

"use strict";

const db = require("../models");

const { Service } = db;

exports.createService = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const service = await Service.create({ name, description, price });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    service.name = name;
    service.description = description;
    service.price = price;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    await service.destroy();
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

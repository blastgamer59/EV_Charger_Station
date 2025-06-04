import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { Save, X } from "lucide-react";
import Input from "../ui/Input";

const StationForm = ({ station, onSubmit, onCancel }) => {
  const initialState = station || {
    id: crypto.randomUUID(),
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: 0,
    longitude: 0,
    status: "inactive",
    powerOutput: 50,
    connectorTypes: [],
    lastUpdated: new Date().toISOString(),
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const connectorOptions = [
    "CCS1",
    "CCS2",
    "CHAdeMO",
    "Type1",
    "Type2",
    "Tesla",
  ];

  useEffect(() => {
    if (station) {
      setFormData({
        ...station,
        latitude: parseFloat(station.latitude) || 0,
        longitude: parseFloat(station.longitude) || 0,
        powerOutput: parseFloat(station.powerOutput) || 50,
      });
    }
  }, [station]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "latitude" || name === "longitude" || name === "powerOutput"
          ? parseFloat(value) || 0
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleConnectorChange = (connector) => {
    setFormData((prev) => {
      const connectors = prev.connectorTypes.includes(connector)
        ? prev.connectorTypes.filter((c) => c !== connector)
        : [...prev.connectorTypes, connector];

      return {
        ...prev,
        connectorTypes: connectors,
      };
    });

    if (errors.connectorTypes) {
      setErrors((prev) => ({
        ...prev,
        connectorTypes: "",
      }));
    }
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP Code is required";

    if (isNaN(formData.latitude) || formData.latitude === 0)
      newErrors.latitude = "Valid latitude is required";
    if (isNaN(formData.longitude) || formData.longitude === 0)
      newErrors.longitude = "Valid longitude is required";
    if (isNaN(formData.powerOutput) || formData.powerOutput <= 0) {
      newErrors.powerOutput = "Power output must be a positive number";
    }

    if (formData.connectorTypes.length === 0) {
      newErrors.connectorTypes = "At least one connector type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const updatedStation = {
      ...formData,
      lastUpdated: new Date().toISOString(),
    };

    console.log("Submitting station:", updatedStation);

    setTimeout(() => {
      onSubmit(updatedStation);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          {station ? "Edit Charging Station" : "Add New Charging Station"}
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Station Name*
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                errors.name ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter station name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address*
            </label>
            <Input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                errors.address ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="123 Main St"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City*
            </label>
            <Input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                errors.city ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="City"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          {/* State & ZIP */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State*
              </label>
              <Input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                  errors.state ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="CA"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP Code*
              </label>
              <Input
                type="text"
                name="zipCode"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                  errors.zipCode ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="94105"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
              )}
            </div>
          </div>

          {/* Coordinates */}
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude*
            </label>
            <Input
              type="number"
              name="latitude"
              id="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                errors.latitude ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="37.7749"
            />
            {errors.latitude && (
              <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude*
            </label>
            <Input
              type="number"
              name="longitude"
              id="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                errors.longitude ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="-122.4194"
            />
            {errors.longitude && (
              <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>
            )}
          </div>

          {/* Power Output */}
          <div>
            <label
              htmlFor="powerOutput"
              className="block text-sm font-medium text-gray-700"
            >
              Power Output (kW)*
            </label>
            <Input
              type="number"
              name="powerOutput"
              id="powerOutput"
              min="1"
              value={formData.powerOutput}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                errors.powerOutput ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="150"
            />
            {errors.powerOutput && (
              <p className="mt-1 text-sm text-red-600">{errors.powerOutput}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="space-y-2">
              {["active", "inactive", "maintenance"].map((status) => (
                <label key={status} className="inline-flex items-center mr-4">
                  <Input
                    type="radio"
                    className="form-radio text-green-600 focus:ring-green-500"
                    name="status"
                    checked={formData.status === status}
                    onChange={() => handleStatusChange(status)}
                  />
                  <span className="ml-2 capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Connector Types */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connector Types*
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {connectorOptions.map((connector) => (
                <label key={connector} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                    checked={formData.connectorTypes.includes(connector)}
                    onChange={() => handleConnectorChange(connector)}
                  />
                  <span className="ml-2">{connector}</span>
                </label>
              ))}
            </div>
            {errors.connectorTypes && (
              <p className="mt-1 text-sm text-red-600">
                {errors.connectorTypes}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          icon={<X size={16} />}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          icon={<Save size={16} />}
        >
          {station ? "Update Station" : "Create Station"}
        </Button>
      </div>
    </form>
  );
};

export default StationForm;

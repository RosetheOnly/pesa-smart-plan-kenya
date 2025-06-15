
import React, { useState } from "react";
import { Building2, Save, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface BusinessProfileData {
  description: string;
  specialties: string[];
  services: string[];
  workingHours: string;
  targetCustomers: string;
}

interface Props {
  language: "en" | "sw";
  initialData?: BusinessProfileData;
  onSave: (data: BusinessProfileData) => void;
}

const businessProfileCopy = {
  en: {
    title: "Business Profile",
    description: "Business Description",
    descriptionPlaceholder: "Describe your business, what makes you unique, and what customers can expect...",
    specialties: "Specialties",
    specialtiesPlaceholder: "e.g., smartphones, laptops, fashion accessories",
    services: "Services Offered",
    servicesPlaceholder: "e.g., delivery, installation, warranty, customer support",
    workingHours: "Working Hours",
    workingHoursPlaceholder: "e.g., Mon-Fri 8AM-6PM, Sat 9AM-4PM",
    targetCustomers: "Target Customers",
    targetCustomersPlaceholder: "Who are your ideal customers?",
    save: "Save Profile",
    edit: "Edit Profile",
  },
  sw: {
    title: "Maelezo ya Biashara",
    description: "Maelezo ya Biashara",
    descriptionPlaceholder: "Elezea biashara yako, ni nini kinachokufanya wa kipekee, na wateja wanaweza kutarajia nini...",
    specialties: "Utaalamu",
    specialtiesPlaceholder: "k.m., simu za mkononi, kompyuta, vifaa vya mitindo",
    services: "Huduma Zinazotolewa",
    servicesPlaceholder: "k.m., uwasilishaji, usakinishaji, dhamana, msaada wa wateja",
    workingHours: "Masaa ya Kazi",
    workingHoursPlaceholder: "k.m., Jumatatu-Ijumaa 8AM-6PM, Jumamosi 9AM-4PM",
    targetCustomers: "Wateja Waliokusudiwa",
    targetCustomersPlaceholder: "Ni nani wateja wako bora?",
    save: "Hifadhi Maelezo",
    edit: "Hariri Maelezo",
  },
};

const BusinessProfile: React.FC<Props> = ({ language, initialData, onSave }) => {
  const [isEditing, setIsEditing] = useState(!initialData);
  const [formData, setFormData] = useState<BusinessProfileData>(
    initialData || {
      description: "",
      specialties: [],
      services: [],
      workingHours: "",
      targetCustomers: "",
    }
  );

  const copy = businessProfileCopy[language];

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleArrayChange = (field: 'specialties' | 'services', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          {copy.title}
        </h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit size={16} className="mr-2" />
            {copy.edit}
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">{copy.description}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder={copy.descriptionPlaceholder}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="specialties">{copy.specialties}</Label>
            <Input
              id="specialties"
              value={formData.specialties.join(', ')}
              onChange={(e) => handleArrayChange('specialties', e.target.value)}
              placeholder={copy.specialtiesPlaceholder}
            />
          </div>

          <div>
            <Label htmlFor="services">{copy.services}</Label>
            <Input
              id="services"
              value={formData.services.join(', ')}
              onChange={(e) => handleArrayChange('services', e.target.value)}
              placeholder={copy.servicesPlaceholder}
            />
          </div>

          <div>
            <Label htmlFor="workingHours">{copy.workingHours}</Label>
            <Input
              id="workingHours"
              value={formData.workingHours}
              onChange={(e) => setFormData(prev => ({ ...prev, workingHours: e.target.value }))}
              placeholder={copy.workingHoursPlaceholder}
            />
          </div>

          <div>
            <Label htmlFor="targetCustomers">{copy.targetCustomers}</Label>
            <Textarea
              id="targetCustomers"
              value={formData.targetCustomers}
              onChange={(e) => setFormData(prev => ({ ...prev, targetCustomers: e.target.value }))}
              placeholder={copy.targetCustomersPlaceholder}
              rows={2}
            />
          </div>

          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save size={16} className="mr-2" />
            {copy.save}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{copy.description}</h4>
            <p className="text-gray-600">{formData.description || "No description provided"}</p>
          </div>

          {formData.specialties.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">{copy.specialties}</h4>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.services.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">{copy.services}</h4>
              <div className="flex flex-wrap gap-2">
                {formData.services.map((service, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.workingHours && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">{copy.workingHours}</h4>
              <p className="text-gray-600">{formData.workingHours}</p>
            </div>
          )}

          {formData.targetCustomers && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">{copy.targetCustomers}</h4>
              <p className="text-gray-600">{formData.targetCustomers}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;

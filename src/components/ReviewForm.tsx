
import React, { useState } from "react";
import { Star, Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface Props {
  language: "en" | "sw";
  productId: string;
  businessId: string;
  onSubmit: (reviewData: any) => void;
  onClose: () => void;
}

const reviewCopy = {
  en: {
    title: "Write a Review",
    rating: "Rating",
    comment: "Your Review",
    commentPlaceholder: "Tell others about your experience...",
    uploadMedia: "Upload Photos/Videos",
    submit: "Submit Review",
    cancel: "Cancel",
    ratingRequired: "Please select a rating",
    commentRequired: "Please write a review",
  },
  sw: {
    title: "Andika Tathmini",
    rating: "Kiwango",
    comment: "Tathmini Yako",
    commentPlaceholder: "Waambie wengine kuhusu uzoefu wako...",
    uploadMedia: "Pakia Picha/Video",
    submit: "Tuma Tathmini",
    cancel: "Ghairi",
    ratingRequired: "Tafadhali chagua kiwango",
    commentRequired: "Tafadhali andika tathmini",
  },
};

const ReviewForm: React.FC<Props> = ({ language, productId, businessId, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = reviewCopy[language];

  const handleRatingClick = (value: number) => {
    setRating(value);
    setErrors(errors.filter(e => e !== copy.ratingRequired));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setMediaFiles([...mediaFiles, ...files]);
    }
  };

  const removeMediaFile = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (rating === 0) newErrors.push(copy.ratingRequired);
    if (!comment.trim()) newErrors.push(copy.commentRequired);
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const reviewData = {
      productId,
      businessId,
      rating,
      comment: comment.trim(),
      mediaFiles,
      createdAt: new Date().toISOString(),
    };

    await onSubmit(reviewData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{copy.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>{copy.rating}</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="comment">{copy.comment}</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setErrors(errors.filter(e => e !== copy.commentRequired));
              }}
              placeholder={copy.commentPlaceholder}
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label>{copy.uploadMedia}</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Upload size={20} />
                <span className="text-sm text-gray-600">{copy.uploadMedia}</span>
              </label>
            </div>
            
            {mediaFiles.length > 0 && (
              <div className="mt-2 space-y-2">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeMediaFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              {errors.map((error, index) => (
                <p key={index} className="text-red-600 text-sm">{error}</p>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {copy.cancel}
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : copy.submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

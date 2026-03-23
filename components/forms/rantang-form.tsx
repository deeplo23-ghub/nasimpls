"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Minus, Trash2, Sparkles, Loader2, MapPin, Truck, X, Check, Search, Map as MapIcon } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { netlifyForms } from "@/lib/constants";
import { encodeNetlifyForm } from "@/lib/netlify-form";

export function RantangForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderItems, setOrderItems] = useState([{ id: Date.now(), dish: "", quantity: 1 }]);
  const [phoneValue, setPhoneValue] = useState("");
  const [dietaryValue, setDietaryValue] = useState<string[]>([]);
  const [customDietary, setCustomDietary] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPackagingClaimed, setIsPackagingClaimed] = useState(false);

  // Minneapolis Coords for filtering
  const MPLS_VIEWBOX = "-93.3292,45.0513,-93.1938,44.8907"; 

  const fetchAddressSuggestions = async (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    setIsSearchingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query + ", Minneapolis, MN"
        )}&viewbox=${MPLS_VIEWBOX}&bounded=1&addressdetails=1&limit=5`,
        {
          headers: {
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "NasiMPLS-OrderForm/1.0"
          }
        }
      );
      const data = await response.json();
      setAddressSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Geocoding error:", err);
    } finally {
      setIsSearchingAddress(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (addressValue.length >= 3) {
        fetchAddressSuggestions(addressValue);
      } else {
        setAddressSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [addressValue]);

  const PRESET_RESTRICTIONS = [
    "Vegetarian", 
    "Vegan", 
    "Gluten-Free", 
    "Dairy-Free",
    "Halal", 
    "No Peanuts", 
    "Nut-Free",
    "Egg-Free",
    "No Shellfish",
    "No MSG",
    "Low Spice",
    "No Cilantro"
  ];

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { id: Date.now(), dish: "", quantity: 1 }]);
  };

  const removeOrderItem = (id: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter(item => item.id !== id));
    }
  };

  const updateOrderItem = (id: number, field: string, value: any) => {
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const toggleRestriction = (tag: string) => {
    if (dietaryValue.includes(tag)) {
      setDietaryValue(dietaryValue.filter(t => t !== tag));
    } else {
      setDietaryValue([...dietaryValue, tag]);
    }
  };

  const addCustomRestriction = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && customDietary.trim()) {
      e.preventDefault();
      if (!dietaryValue.includes(customDietary.trim())) {
        setDietaryValue([...dietaryValue, customDietary.trim()]);
      }
      setCustomDietary("");
    }
  };

  const formattedOrderDetails = orderItems
    .filter(item => item.dish.trim() !== "")
    .map(item => `${item.dish} x${item.quantity}`)
    .join(", ");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeNetlifyForm({
          "form-name": netlifyForms.rantang,
          ...payload,
          order_details: formattedOrderDetails || payload.order_details
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      router.push("/thank-you?form=rantang");
    } catch {
      setError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      name={netlifyForms.rantang}
      method="POST"
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="dark max-w-2xl mx-auto space-y-3"
    >
      <input type="hidden" name="form-name" value={netlifyForms.rantang} />
      <input type="hidden" name="bot-field" />
      
      {/* Contact Info Section */}
      <div className="group/card bg-white/[0.03] border border-white/10 rounded-3xl p-4 shadow-sm space-y-2.5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20">
        <h3 className="font-serif text-[1.05rem] font-bold text-brand-yellow flex items-center gap-2">
          Contact Details
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="rantang-name" className="font-serif text-[1.05rem] font-bold text-brand-cream/90">
              Full Name
            </Label>
            <Input id="rantang-name" name="full_name" required placeholder="What should we call you?" className="h-10 border-white/10 bg-white/5 focus-visible:border-brand-yellow rounded-2xl" />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="rantang-phone" className="font-serif text-[1.05rem] font-bold text-brand-cream/90">
              Phone Number
            </Label>
            <Input 
              id="rantang-phone" 
              name="phone" 
              required 
              value={phoneValue}
              onChange={handlePhoneChange}
              placeholder="(555) 012-3456" 
              className="h-10 border-white/10 bg-white/5 focus-visible:border-brand-yellow transition-all rounded-2xl" 
            />
          </div>

          <div className="space-y-1.5 md:col-span-2 relative">
            <Label htmlFor="rantang-address" className="font-serif text-[1.05rem] font-bold text-brand-cream/90">
              Delivery Address
            </Label>
            <div className="relative group/address">
              <Input
                id="rantang-address"
                name="delivery_address"
                required
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
                onFocus={() => addressSuggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Where in Minneapolis should we deliver?"
                className="h-10 border-white/10 bg-white/5 pr-10 focus-visible:border-brand-yellow transition-all rounded-2xl"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isSearchingAddress ? (
                  <Loader2 className="h-4 w-4 animate-spin text-brand-yellow/50" />
                ) : (
                  <Search className="h-4 w-4 text-brand-cream/20" />
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && addressSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {addressSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="w-full text-left px-4 py-2.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none"
                      onClick={() => {
                        setAddressValue(suggestion.display_name.split(", Minneapolis")[0]);
                        setShowSuggestions(false);
                        setAddressSuggestions([]);
                      }}
                    >
                      <div className="text-[0.85rem] font-bold text-brand-cream/90">
                        {suggestion.address.house_number ? `${suggestion.address.house_number} ` : ""}{suggestion.address.road || suggestion.display_name.split(",")[0]}
                      </div>
                      <div className="text-[0.7rem] text-brand-cream/40 truncate">
                        {suggestion.display_name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-[0.75rem] font-black text-brand-yellow/50 px-1 mt-1 transition-colors group-hover/card:text-brand-yellow/70">
              <MapPin className="h-3 w-3" />
              Only delivering within Minneapolis
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="group/card bg-white/[0.03] border border-white/10 rounded-3xl p-4 shadow-sm space-y-2.5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20">
        <h3 className="font-serif text-[1.05rem] font-bold text-brand-yellow flex items-center gap-2">
          The Order
        </h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="rantang-order" className="font-serif text-[1.05rem] font-bold text-brand-cream/90">
              Food Order
            </Label>
            <div className="space-y-2">
              {orderItems.map((item, index) => (
                <div key={item.id} className="group flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="What dish are you ordering?"
                      value={item.dish}
                      onChange={(e) => updateOrderItem(item.id, "dish", e.target.value)}
                      className="h-10 border-white/10 bg-white/5 focus-visible:border-brand-yellow font-medium rounded-2xl"
                    />
                  </div>
                  
                  <div className="flex items-center bg-white/5 rounded-full border border-white/10 h-10 px-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/10 text-brand-cream/60 rounded-full"
                      onClick={() => updateOrderItem(item.id, "quantity", Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-[0.85rem] font-bold text-brand-yellow">{item.quantity}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/10 text-brand-cream/60 rounded-full"
                      onClick={() => updateOrderItem(item.id, "quantity", item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-[#f2f2f2] hover:text-brand-red hover:bg-brand-red/10 opacity-20 group-hover:opacity-100 transition-all duration-200 rounded-full"
                    onClick={() => removeOrderItem(item.id)}
                    disabled={orderItems.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start text-brand-yellow/60 hover:text-brand-yellow hover:bg-brand-yellow/5 h-10 font-bold text-[0.8rem] border border-dashed border-white/20 mt-1 rounded-full"
                onClick={addOrderItem}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add another item
              </Button>
              <input type="hidden" name="order_details" value={formattedOrderDetails} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rantang-dietary" className="font-serif text-[1.05rem] font-bold text-brand-cream/90">
              Dietary Restrictions
            </Label>
            <div className="space-y-3">
              {/* Selected Tags Display */}
              <div className="flex flex-wrap gap-2 p-2.5 rounded-3xl border border-white/10 bg-white/5 min-h-[44px] transition-all focus-within:border-brand-yellow/50">
                {dietaryValue.map(tag => (
                  <span 
                    key={tag} 
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-yellow text-brand-deep-green text-[0.75rem] font-black animate-in zoom-in-95 duration-200"
                  >
                    {tag}
                    <button 
                      type="button"
                      onClick={() => toggleRestriction(tag)}
                      className="hover:bg-brand-deep-green/10 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder={dietaryValue.length === 0 ? "Vegetarian? No peanuts? Type to add..." : "Add another..."}
                  className="flex-1 bg-transparent border-none outline-none text-[0.85rem] text-brand-cream placeholder:text-brand-cream/30 min-w-[120px]"
                  value={customDietary}
                  onChange={(e) => setCustomDietary(e.target.value)}
                  onKeyDown={addCustomRestriction}
                />
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_RESTRICTIONS.map(tag => {
                  const isSelected = dietaryValue.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleRestriction(tag)}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-full text-[0.75rem] font-bold border transition-all ${
                        isSelected 
                          ? "bg-brand-yellow/10 border-brand-yellow/50 text-brand-yellow shadow-[0_0_15px_rgba(242,174,48,0.1)]" 
                          : "bg-white/5 border-white/5 text-brand-cream/40 hover:bg-white/10 hover:text-brand-cream/60"
                      }`}
                    >
                      {tag}
                      {isSelected && <Check className="h-3 w-3 ml-1" />}
                    </button>
                  );
                })}
              </div>
              
              <input type="hidden" name="dietary_restrictions" value={dietaryValue.join(", ")} />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="group/card bg-white/[0.03] border border-white/10 rounded-3xl p-4 shadow-sm space-y-3 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20">
        <h3 className="font-serif text-[1.05rem] font-bold text-brand-yellow flex items-center gap-2">
          Payment
        </h3>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="font-serif text-[1.05rem] font-bold text-brand-cream/90">Select Method</Label>
            <RadioGroup name="payment_method" required className="grid grid-cols-2 gap-3">
              <div className="relative">
                <RadioGroupItem value="Venmo" id="venmo" className="peer absolute opacity-0" />
                <Label
                  htmlFor="venmo"
                  className="flex cursor-pointer items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 py-2.5 px-4 transition-all hover:bg-white/10 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-yellow/50 peer-data-[checked]:border-brand-yellow peer-data-[checked]:bg-brand-yellow peer-data-[checked]:text-brand-deep-green"
                >
                  <Image src="/images/venmo.png" alt="" width={18} height={18} className="pointer-events-none h-4.5 w-auto object-contain brightness-110 peer-data-[checked]:brightness-0" />
                  <span className="pointer-events-none text-[0.85rem] font-black">Venmo</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="Zelle" id="zelle" className="peer absolute opacity-0" />
                <Label
                  htmlFor="zelle"
                  className="flex cursor-pointer items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 py-2.5 px-4 transition-all hover:bg-white/10 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-yellow/50 peer-data-[checked]:border-brand-yellow peer-data-[checked]:bg-brand-yellow peer-data-[checked]:text-brand-deep-green"
                >
                  <Image src="/images/zelle.png" alt="" width={18} height={18} className="pointer-events-none h-4.5 w-auto object-contain peer-data-[checked]:brightness-0" />
                  <span className="pointer-events-none text-[0.85rem] font-black">Zelle</span>
                </Label>
              </div>
            </RadioGroup>
            <p className="text-[0.75rem] italic text-brand-cream/40 px-1">Please send payment receipt to <a href="https://instagram.com/nasi.mpls" target="_blank" rel="noreferrer" className="text-brand-yellow font-bold hover:underline">@nasi.mpls</a> before or after submitting.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rantang-handle" className="font-serif text-[1.05rem] font-bold text-brand-cream/90">Your Handle</Label>
              <Input id="rantang-handle" name="payment_handle" placeholder="@username" className="h-10 border-white/10 bg-white/5 focus-visible:border-brand-yellow placeholder:text-brand-cream/30 rounded-2xl" />
            </div>

            <div className="space-y-2">
              <Label className="font-serif text-[1.05rem] font-bold text-brand-cream/90">Paid Status</Label>
              <RadioGroup name="paid_status" required className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <RadioGroupItem value="Yes" id="paid-yes" className="peer absolute opacity-0" />
                  <Label htmlFor="paid-yes" className="flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-[0.85rem] font-semibold text-brand-cream/40 transition-all hover:bg-white/10 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-yellow/50 peer-data-[checked]:border-brand-yellow peer-data-[checked]:bg-brand-yellow peer-data-[checked]:text-brand-deep-green">
                    Already Paid
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem value="No" id="paid-no" className="peer absolute opacity-0" />
                  <Label htmlFor="paid-no" className="flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-[0.85rem] font-semibold text-brand-cream/40 transition-all hover:bg-white/10 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-yellow/50 peer-data-[checked]:border-brand-yellow peer-data-[checked]:bg-brand-yellow peer-data-[checked]:text-brand-deep-green">
                    Paying Now
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-brand-yellow/30 bg-brand-yellow/5 p-4">
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label className="font-serif text-[1.1rem] font-black text-brand-yellow">Packaging Return Deal</Label>
                  <span className="rounded-full bg-brand-yellow px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-brand-deep-green">10% Off</span>
                </div>
                <p className="text-[0.85rem] text-brand-cream/70 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Help us keep it green by returning your food packaging
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end self-end sm:self-center">
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setIsPackagingClaimed(!isPackagingClaimed)}
                  className={`h-11 px-6 font-black transition-all rounded-full ${
                    isPackagingClaimed 
                      ? "bg-brand-yellow text-brand-deep-green hover:bg-brand-yellow/90 shadow-[0_0_20px_rgba(242,174,48,0.3)] hover:scale-105 active:scale-95" 
                      : "bg-white/10 text-brand-cream/80 border border-white/20 hover:bg-brand-yellow/10 hover:text-brand-yellow hover:border-brand-yellow/50"
                  }`}
                >
                  {isPackagingClaimed ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 stroke-[3]" />
                      Claimed
                    </div>
                  ) : (
                    "Claim"
                  )}
                </Button>
                <input type="hidden" name="return_packaging" value={isPackagingClaimed ? "Yes" : "No"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Misc Info Section */}
      <div className="group/card bg-white/[0.03] border border-white/10 rounded-3xl p-4 shadow-sm space-y-2.5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20">
        <h3 className="font-serif text-[1.05rem] font-bold text-brand-yellow flex items-center gap-2">
          Final Notes
        </h3>
        <div className="space-y-1.5">
          <Label htmlFor="rantang-notes" className="font-serif text-[1.05rem] font-bold text-brand-cream/90">Anything else?</Label>
          <Textarea
            id="rantang-notes"
            name="notes"
            className="min-h-16 border-white/10 bg-white/5 focus-visible:border-brand-yellow text-sm rounded-2xl"
            placeholder="Gate codes, special requests..."
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pt-0">
        <Button 
          type="submit" 
          size="lg"
          className="h-12 w-full md:w-auto px-10 text-[1rem] font-black bg-brand-yellow text-brand-deep-green hover:bg-white shadow-lg active:scale-95 transition-all disabled:opacity-80 rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Cooking your order...</span>
            </div>
          ) : (
            "Complete My Order"
          )}
        </Button>
        {error ? <p className="text-sm font-bold text-brand-yellow/80">{error}</p> : null}
      </div>
    </form>
  );
}

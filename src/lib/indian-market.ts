// Indian States and Union Territories
export const INDIAN_STATES = [
  { code: 'AN', name: 'Andaman and Nicobar Islands' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'AR', name: 'Arunachal Pradesh' },
  { code: 'AS', name: 'Assam' },
  { code: 'BR', name: 'Bihar' },
  { code: 'CH', name: 'Chandigarh' },
  { code: 'CT', name: 'Chhattisgarh' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: 'DL', name: 'Delhi' },
  { code: 'GA', name: 'Goa' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'HR', name: 'Haryana' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'JK', name: 'Jammu and Kashmir' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'KL', name: 'Kerala' },
  { code: 'LA', name: 'Ladakh' },
  { code: 'LD', name: 'Lakshadweep' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'MN', name: 'Manipur' },
  { code: 'ML', name: 'Meghalaya' },
  { code: 'MZ', name: 'Mizoram' },
  { code: 'NL', name: 'Nagaland' },
  { code: 'OR', name: 'Odisha' },
  { code: 'PY', name: 'Puducherry' },
  { code: 'PB', name: 'Punjab' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'SK', name: 'Sikkim' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TG', name: 'Telangana' },
  { code: 'TR', name: 'Tripura' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'UT', name: 'Uttarakhand' },
  { code: 'WB', name: 'West Bengal' },
];

// Major Indian cities for quick selection
export const MAJOR_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Surat', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Vadodara', 'Coimbatore', 'Kochi'
];

// GST rates in India
export const GST_RATES = [
  { rate: 0, label: '0% - Exempt' },
  { rate: 5, label: '5% GST' },
  { rate: 12, label: '12% GST' },
  { rate: 18, label: '18% GST' },
  { rate: 28, label: '28% GST' },
];

// Indian industry sectors
export const INDIAN_INDUSTRIES = [
  { value: 'it_services', label: 'IT Services & Consulting' },
  { value: 'saas', label: 'SaaS / Software Products' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'pharma', label: 'Pharmaceuticals' },
  { value: 'fmcg', label: 'FMCG' },
  { value: 'bfsi', label: 'BFSI (Banking, Financial Services, Insurance)' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education & EdTech' },
  { value: 'real_estate', label: 'Real Estate & Construction' },
  { value: 'logistics', label: 'Logistics & Supply Chain' },
  { value: 'telecom', label: 'Telecom' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'other', label: 'Other' },
];

// Format currency to INR
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format currency with compact notation (lakhs, crores)
export function formatINRCompact(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return formatINR(amount);
}

// Calculate GST
export function calculateGST(amount: number, gstRate: number): { cgst: number; sgst: number; igst: number; total: number } {
  const gstAmount = (amount * gstRate) / 100;
  return {
    cgst: gstAmount / 2,
    sgst: gstAmount / 2,
    igst: gstAmount, // For inter-state
    total: amount + gstAmount,
  };
}

// Validate GST Number (15 characters)
export function validateGSTNumber(gst: string): boolean {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
}

// Validate PAN Number (10 characters)
export function validatePANNumber(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
}

// Indian financial year (April to March)
export function getCurrentFinancialYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  if (month >= 3) { // April onwards
    return `FY ${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    return `FY ${year - 1}-${year.toString().slice(-2)}`;
  }
}

// Get financial quarter
export function getCurrentQuarter(): string {
  const now = new Date();
  const month = now.getMonth();
  
  if (month >= 0 && month <= 2) return 'Q4';
  if (month >= 3 && month <= 5) return 'Q1';
  if (month >= 6 && month <= 8) return 'Q2';
  return 'Q3';
}

// Indian phone number formatting
export function formatIndianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

// B2B Sales stages specific to Indian market
export const DEAL_STAGES = [
  { id: 'lead', label: 'Lead', probability: 10 },
  { id: 'qualified', label: 'Qualified', probability: 25 },
  { id: 'proposal', label: 'Proposal Sent', probability: 50 },
  { id: 'negotiation', label: 'Negotiation', probability: 75 },
  { id: 'closed_won', label: 'Won', probability: 100 },
  { id: 'closed_lost', label: 'Lost', probability: 0 },
];

// Lead sources common in Indian B2B
export const LEAD_SOURCES = [
  { value: 'website', label: 'Website / Inbound' },
  { value: 'referral', label: 'Referral' },
  { value: 'cold_call', label: 'Cold Call' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'trade_show', label: 'Trade Show / Exhibition' },
  { value: 'advertisement', label: 'Digital Ads' },
  { value: 'partner', label: 'Channel Partner' },
  { value: 'other', label: 'Other' },
];

// Company sizes
export const COMPANY_SIZES = [
  { value: 'startup', label: 'Startup (1-10 employees)' },
  { value: 'small', label: 'Small (11-50 employees)' },
  { value: 'medium', label: 'Medium (51-200 employees)' },
  { value: 'large', label: 'Large (201-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' },
];

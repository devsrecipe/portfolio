import type { AutomationScenario } from "@/types";

export const automationScenarios: AutomationScenario[] = [
  {
    id: "restaurant",
    tab: "Restaurant",
    title: "Restaurant",
    inputs: [
      { title: "Website order", meta: "#1042 · €28.50" },
      { title: "WhatsApp order", meta: "2 × Margherita" },
      { title: "Table booking", meta: "Fri · 4 guests" },
    ],
    outputs: [
      { title: "Kitchen screen", meta: "Order #1042" },
      { title: "Stock updated", meta: "Mozzarella low" },
      { title: "Receipt sent", meta: "By email" },
    ],
    handled: [
      "Order #1042 sent to the kitchen screen",
      "Mozzarella running low, reorder drafted",
      "Receipt emailed to the customer",
    ],
  },
  {
    id: "store",
    tab: "Store",
    title: "Store",
    inputs: [
      { title: "Web order", meta: "#2210 · 3 items" },
      { title: "Marketplace order", meta: "Blue sneakers" },
      { title: "Return request", meta: "Order #2188" },
    ],
    outputs: [
      { title: "Pick list", meta: "Warehouse A" },
      { title: "Inventory synced", meta: "All channels" },
      { title: "Label printed", meta: "Courier ready" },
    ],
    handled: [
      "Order #2210 sent to the warehouse pick list",
      "Stock updated on every sales channel",
      "Shipping label created and emailed",
    ],
  },
  {
    id: "tours",
    tab: "Tours",
    title: "Tours",
    inputs: [
      { title: "Website booking", meta: "City walk · 6 guests" },
      { title: "WhatsApp enquiry", meta: "Sat sunrise tour" },
      { title: "Deposit paid", meta: "30% · card" },
    ],
    outputs: [
      { title: "Calendar blocked", meta: "Sat · 06:00" },
      { title: "Guide notified", meta: "By message" },
      { title: "Confirmation sent", meta: "With meeting point" },
    ],
    handled: [
      "Saturday slot blocked as soon as the deposit lands",
      "Guide told the group size and pickup point",
      "Confirmation and reminder sent to the guest",
    ],
  },
  {
    id: "clinic",
    tab: "Clinic",
    title: "Clinic",
    inputs: [
      { title: "Online appointment", meta: "Dr. Rahman · Tue 10:30" },
      { title: "Prescription", meta: "Patient #318" },
      { title: "Test order", meta: "Blood panel" },
    ],
    outputs: [
      { title: "Schedule updated", meta: "Dr. Rahman" },
      { title: "Record opened", meta: "Patient history" },
      { title: "Reminder queued", meta: "Day before" },
    ],
    handled: [
      "Slot reserved and the doctor's day updated",
      "Patient history ready before the visit",
      "Reminder scheduled for the day before",
    ],
  },
  {
    id: "diagnostics",
    tab: "Diagnostics",
    title: "Diagnostics",
    inputs: [
      { title: "Test booking", meta: "CBC · home sample" },
      { title: "Sample received", meta: "Tube #5521" },
      { title: "Result entered", meta: "Lab 2" },
    ],
    outputs: [
      { title: "Sample tracked", meta: "In analysis" },
      { title: "Report generated", meta: "PDF" },
      { title: "Patient notified", meta: "SMS and email" },
    ],
    handled: [
      "Sample #5521 tracked from collection to lab",
      "Report generated the moment the result is signed off",
      "Patient gets a secure link to download it",
    ],
  },
  {
    id: "school",
    tab: "School",
    title: "School",
    inputs: [
      { title: "Admission form", meta: "Grade 5" },
      { title: "Attendance", meta: "Class 7B" },
      { title: "Fee payment", meta: "Term 2" },
    ],
    outputs: [
      { title: "Student record", meta: "Created" },
      { title: "Parent alerted", meta: "Absent today" },
      { title: "Receipt issued", meta: "Fee cleared" },
    ],
    handled: [
      "Student record created from the admission form",
      "Parents told the same morning when a child is absent",
      "Fee receipt issued and the ledger balanced",
    ],
  },
  {
    id: "pet-care",
    tab: "Pet care",
    title: "Pet care",
    inputs: [
      { title: "Grooming booking", meta: "Max · Sat 11:00" },
      { title: "Shop order", meta: "Dog food 10 kg" },
      { title: "Vaccine due", meta: "Luna" },
    ],
    outputs: [
      { title: "Groomer scheduled", meta: "Sat · Sam" },
      { title: "Order packed", meta: "Delivery today" },
      { title: "Reminder sent", meta: "To owner" },
    ],
    handled: [
      "Grooming slot confirmed and added to the groomer's day",
      "Shop order packed from live stock",
      "Owner reminded when a vaccine is due",
    ],
  },
  {
    id: "retail",
    tab: "Retail",
    title: "Retail",
    inputs: [
      { title: "POS sale", meta: "Outlet 3 · 12 items" },
      { title: "Distributor order", meta: "Northside Foods" },
      { title: "Stock count", meta: "Aisle 4" },
    ],
    outputs: [
      { title: "Stock updated", meta: "All outlets" },
      { title: "Purchase drafted", meta: "Low items" },
      { title: "Daily report", meta: "Sent 18:00" },
    ],
    handled: [
      "Every sale deducts stock across all outlets",
      "Purchase order drafted when items run low",
      "Daily sales report sent to the owner",
    ],
  },
];

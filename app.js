const DEFAULT_DAILY_CALORIE_TARGET = 1600;

const MEAL_SCHEDULES = {
  "3": {
    label: "3 meals a day",
    mealOrder: ["Breakfast", "Lunch", "Dinner"],
    mealLabels: { Breakfast: "Breakfast", Lunch: "Lunch", Dinner: "Dinner" },
    splits: { Breakfast: 0.25, Lunch: 0.35, Dinner: 0.40 }
  },
  "2": {
    label: "2 meals a day",
    mealOrder: ["Lunch", "Dinner"],
    mealLabels: { Lunch: "Meal 1", Dinner: "Meal 2" },
    splits: { Lunch: 0.45, Dinner: 0.55 }
  },
  "1": {
    label: "OMAD",
    mealOrder: ["Dinner"],
    mealLabels: { Dinner: "OMAD" },
    splits: { Dinner: 1 }
  }
};

const CARB_MODE_MACROS = {
  strict: { carbsPct: 0.10, proteinPct: 0.30, fatPct: 0.60, carbLabel: "Strict low-carb" },
  moderate: { carbsPct: 0.20, proteinPct: 0.30, fatPct: 0.50, carbLabel: "Moderate low-carb" }
};

const COUNTRY_BASE_TARGETS = {
  US: 2000,
  UK: 1900,
  Philippines: 1800,
  Japan: 1800,
  Korean: 1900,
  China: 1850,
  India: 1850,
  Mediterranean: 1850,
  Australia: 2000,
  Canada: 1950
};

const GOAL_ADJUSTMENTS = {
  "Lose weight": -300,
  Maintain: 0,
  "Gain muscle": 300
};

const COUNTRY_CALORIE_PROFILES = {
  US: { Breakfast: 420, Lunch: 560, Dinner: 680 },
  UK: { Breakfast: 390, Lunch: 530, Dinner: 650 },
  Philippines: { Breakfast: 400, Lunch: 550, Dinner: 650 },
  Japan: { Breakfast: 370, Lunch: 520, Dinner: 620 },
  Korean: { Breakfast: 390, Lunch: 540, Dinner: 650 },
  China: { Breakfast: 380, Lunch: 530, Dinner: 640 },
  India: { Breakfast: 390, Lunch: 540, Dinner: 640 },
  Mediterranean: { Breakfast: 380, Lunch: 520, Dinner: 630 },
  Australia: { Breakfast: 410, Lunch: 560, Dinner: 670 },
  Canada: { Breakfast: 400, Lunch: 550, Dinner: 660 }
};

const PORTION_BY_MEAL = {
  Breakfast: "1 plate / 1 bowl",
  Lunch: "1.5 cups main + 1 cup vegetables",
  Dinner: "1.5 cups main + 1 cup vegetables"
};

const GROCERY_CATEGORIES = {
  Protein: [
    "chicken", "beef", "pork", "salmon", "tuna", "shrimp", "fish", "bangus",
    "liempo", "kippers", "mackerel", "longganisa", "egg", "eggs", "tofu", "tokwa", "cheese", "yogurt"
  ],
  Vegetables: [
    "avocado", "asparagus", "broccoli", "spinach", "mushroom", "mushrooms", "zucchini", "cabbage",
    "cauliflower", "tomato", "tomatoes", "cucumber", "bell pepper", "peppers", "green beans", "kangkong",
    "pechay", "ampalaya", "radish", "papaya", "chili leaves", "malunggay", "eggplant", "talong",
    "leek", "courgettes", "greens"
  ],
  "Pantry and Extras": [
    "almond", "almonds", "chia", "pickle", "pickles", "mayo", "cream cheese", "horseradish",
    "butter", "garlic", "sugar-free syrup"
  ]
};

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MEAL_VARIATION_TEMPLATES = {
  Breakfast: [
    "{base}",
    "{base} with extra greens",
    "{base} with cucumber and lemon",
    "{base} with avocado slices",
    "{base} with olive oil drizzle",
    "{base} with side of sauteed mushrooms",
    "{base} with herbs and cracked pepper",
    "{base} with garlic spinach"
  ],
  Lunch: [
    "{base}",
    "{base} with extra leafy salad",
    "{base} with cucumber salad on the side",
    "{base} with olive and tomato garnish",
    "{base} with extra grilled vegetables",
    "{base} with lemon-herb dressing",
    "{base} with cauliflower rice side",
    "{base} with zucchini ribbons"
  ],
  Dinner: [
    "{base}",
    "{base} with roasted low-carb vegetables",
    "{base} with garlic butter greens",
    "{base} with side salad and vinaigrette",
    "{base} with sauteed broccoli and mushrooms",
    "{base} with cauliflower mash side",
    "{base} with herb-infused olive oil",
    "{base} with spicy chili flakes and greens"
  ]
};

const MEAL_PLANS = {
  US: {
    Monday: {
      Breakfast: "Veggie omelet with cheddar and avocado",
      Lunch: "Grilled chicken Caesar salad (no croutons)",
      Dinner: "Baked salmon with roasted asparagus"
    },
    Tuesday: {
      Breakfast: "Greek yogurt with walnuts and chia",
      Lunch: "Turkey lettuce wraps with cucumber",
      Dinner: "Beef stir-fry with broccoli and bell peppers"
    },
    Wednesday: {
      Breakfast: "Scrambled eggs with spinach and mushrooms",
      Lunch: "Tuna salad stuffed in avocado",
      Dinner: "Pork chops with sauteed green beans"
    },
    Thursday: {
      Breakfast: "Cottage cheese bowl with almonds",
      Lunch: "Bunless cheeseburger with side salad",
      Dinner: "Lemon herb chicken thighs with zucchini"
    },
    Friday: {
      Breakfast: "Smoked salmon and cream cheese roll-ups",
      Lunch: "Cobb salad with egg, bacon, and chicken",
      Dinner: "Shrimp scampi over zucchini noodles"
    },
    Saturday: {
      Breakfast: "Egg muffins with turkey and peppers",
      Lunch: "Chicken salad lettuce boats",
      Dinner: "Steak with garlic butter mushrooms"
    },
    Sunday: {
      Breakfast: "Almond flour pancakes with sugar-free syrup",
      Lunch: "Buffalo chicken salad",
      Dinner: "Roast chicken with cauliflower mash"
    }
  },
  UK: {
    Monday: {
      Breakfast: "Full low-carb fry-up (eggs, bacon, mushrooms, tomato)",
      Lunch: "Coronation chicken salad",
      Dinner: "Roast cod with buttered cabbage"
    },
    Tuesday: {
      Breakfast: "Poached eggs with smoked mackerel",
      Lunch: "Ploughman-style ham, cheese, pickles, and salad",
      Dinner: "Lamb chops with minted courgettes"
    },
    Wednesday: {
      Breakfast: "Greek yogurt with hazelnuts",
      Lunch: "Egg mayo lettuce cups",
      Dinner: "Chicken tikka with cauliflower rice"
    },
    Thursday: {
      Breakfast: "Cheese omelet with spinach",
      Lunch: "Prawn and avocado salad",
      Dinner: "Bangers (high-meat sausages) with buttery greens"
    },
    Friday: {
      Breakfast: "Kippers with scrambled eggs",
      Lunch: "Roast beef salad with horseradish mayo",
      Dinner: "Fish pie topping replaced with cauliflower mash"
    },
    Saturday: {
      Breakfast: "Chia pudding with unsweetened almond milk",
      Lunch: "Chicken and leek soup (no potato)",
      Dinner: "Shepherd's pie with cauliflower topping"
    },
    Sunday: {
      Breakfast: "Bacon and eggs with grilled tomato",
      Lunch: "Cheese and pickle salad plate",
      Dinner: "Sunday roast beef with broccoli and cauliflower"
    }
  },
  Philippines: {
    Monday: {
      Breakfast: "Tortang talong with tomato and cucumber",
      Lunch: "Inihaw na manok with ensaladang talong",
      Dinner: "Sinigang na salmon with radish and kangkong"
    },
    Tuesday: {
      Breakfast: "Longganisa-style chicken sausage with eggs",
      Lunch: "Adobong manok with sauteed pechay",
      Dinner: "Pork giniling with cabbage and green beans"
    },
    Wednesday: {
      Breakfast: "Tokwa and egg scramble",
      Lunch: "Ginisang ampalaya with ground pork",
      Dinner: "Inihaw na liempo with atchara and salad"
    },
    Thursday: {
      Breakfast: "Daing na bangus with salted egg and tomato",
      Lunch: "Chicken afritada without potato, extra bell pepper",
      Dinner: "Beef nilaga without corn and potato"
    },
    Friday: {
      Breakfast: "Omelet with malunggay and cheese",
      Lunch: "Bicol express with steamed pechay",
      Dinner: "Tinolang manok with papaya and chili leaves"
    },
    Saturday: {
      Breakfast: "Sardines with egg and sauteed onion",
      Lunch: "Pork adobo with kangkong",
      Dinner: "Grilled tuna belly with cucumber salad"
    },
    Sunday: {
      Breakfast: "Arroz caldo-style chicken soup using cauliflower rice",
      Lunch: "Lumpiang sariwa filling bowl (no wrapper)",
      Dinner: "Lechon kawali with chopped atchara and greens"
    }
  },
  Japan: {
    Monday: {
      Breakfast: "Tamago omelet with sauteed spinach",
      Lunch: "Teriyaki salmon salad bowl (no rice)",
      Dinner: "Shabu-shabu style beef and napa cabbage"
    },
    Tuesday: {
      Breakfast: "Miso soup with tofu and egg",
      Lunch: "Chicken yakitori with cucumber sesame salad",
      Dinner: "Saba mackerel with grilled eggplant"
    },
    Wednesday: {
      Breakfast: "Avocado natto bowl with soft-boiled egg",
      Lunch: "Tuna sashimi salad with nori strips",
      Dinner: "Ginger pork with shredded cabbage"
    },
    Thursday: {
      Breakfast: "Chawanmushi with mushrooms",
      Lunch: "Chicken katsu-style cutlet (almond crust) with greens",
      Dinner: "Miso cod with bok choy"
    },
    Friday: {
      Breakfast: "Tofu scramble with scallions",
      Lunch: "Beef tataki salad with ponzu",
      Dinner: "Shrimp and vegetable stir-fry"
    },
    Saturday: {
      Breakfast: "Egg roll with spinach and cheese",
      Lunch: "Pork tonjiru (no potato)",
      Dinner: "Grilled yellowtail with daikon salad"
    },
    Sunday: {
      Breakfast: "Miso egg drop soup",
      Lunch: "Chicken tsukune lettuce wraps",
      Dinner: "Sukiyaki-style beef with tofu and mushrooms (no noodles)"
    }
  },
  Korean: {
    Monday: {
      Breakfast: "Gyeran mari (Korean egg roll) with kimchi",
      Lunch: "Dak bulgogi lettuce wraps",
      Dinner: "Samgyeopsal with ssam greens and ssamjang"
    },
    Tuesday: {
      Breakfast: "Doenjang soup with tofu",
      Lunch: "Spicy pork stir-fry with cabbage",
      Dinner: "Grilled mackerel with spinach banchan"
    },
    Wednesday: {
      Breakfast: "Steamed eggs with mushrooms",
      Lunch: "Bibimbap-style bowl over cauliflower rice",
      Dinner: "Galbi beef with grilled zucchini"
    },
    Thursday: {
      Breakfast: "Kimchi and egg skillet",
      Lunch: "Chicken japchae-style stir-fry (no noodles)",
      Dinner: "Sundubu jjigae with seafood"
    },
    Friday: {
      Breakfast: "Tofu and scallion scramble",
      Lunch: "Bossam lettuce wraps",
      Dinner: "Spicy squid and vegetables"
    },
    Saturday: {
      Breakfast: "Greek yogurt with sesame and almonds",
      Lunch: "Bulgogi beef salad bowl",
      Dinner: "Kimchi stew with pork belly and tofu"
    },
    Sunday: {
      Breakfast: "Egg drop soup with seaweed",
      Lunch: "Gochujang chicken skewers with cucumber salad",
      Dinner: "Braised cod with radish"
    }
  },
  China: {
    Monday: {
      Breakfast: "Egg and chive stir-fry with cucumber",
      Lunch: "Kung pao chicken (no sugar) with stir-fried greens",
      Dinner: "Steamed fish with ginger and bok choy"
    },
    Tuesday: {
      Breakfast: "Century egg tofu bowl",
      Lunch: "Beef and broccoli stir-fry",
      Dinner: "Mapo tofu (low-carb, light sauce)"
    },
    Wednesday: {
      Breakfast: "Pork and cabbage egg scramble",
      Lunch: "Roast duck salad cups",
      Dinner: "Garlic shrimp with snow peas"
    },
    Thursday: {
      Breakfast: "Tomato egg stir-fry",
      Lunch: "Chicken and mushroom stir-fry",
      Dinner: "Black pepper beef with bell peppers"
    },
    Friday: {
      Breakfast: "Soy milk tofu pudding with nuts (unsweetened)",
      Lunch: "Steamed chicken with ginger scallion sauce",
      Dinner: "Salt and pepper squid with sauteed greens"
    },
    Saturday: {
      Breakfast: "Scallion omelet",
      Lunch: "Braised tofu and pork mince",
      Dinner: "Cumin lamb with cabbage"
    },
    Sunday: {
      Breakfast: "Egg drop soup with spinach",
      Lunch: "Sichuan poached fish (reduced oil)",
      Dinner: "Chicken claypot style with mushrooms"
    }
  },
  India: {
    Monday: {
      Breakfast: "Paneer bhurji with cucumber",
      Lunch: "Tandoori chicken salad",
      Dinner: "Fish curry with sauteed okra"
    },
    Tuesday: {
      Breakfast: "Masala omelet",
      Lunch: "Chicken tikka with mint salad",
      Dinner: "Palak paneer with roasted cauliflower"
    },
    Wednesday: {
      Breakfast: "Greek yogurt with almonds and cardamom",
      Lunch: "Keema with cabbage stir-fry",
      Dinner: "Butter chicken (light cream) with green beans"
    },
    Thursday: {
      Breakfast: "Boiled eggs with spiced avocado",
      Lunch: "Paneer tikka salad bowl",
      Dinner: "Prawn masala with sauteed spinach"
    },
    Friday: {
      Breakfast: "Coconut chia pudding with pistachio",
      Lunch: "Mutton seekh kebab with cucumber raita",
      Dinner: "Egg curry with cauliflower rice"
    },
    Saturday: {
      Breakfast: "Besan chilla (low-carb) with mint chutney",
      Lunch: "Chicken saag",
      Dinner: "Grilled fish tikka with mixed vegetables"
    },
    Sunday: {
      Breakfast: "Paneer and bell pepper scramble",
      Lunch: "Tandoori salmon salad",
      Dinner: "Lamb curry (no potato) with sauteed cabbage"
    }
  },
  Mediterranean: {
    Monday: {
      Breakfast: "Greek yogurt with walnuts and cinnamon",
      Lunch: "Chicken souvlaki salad with tzatziki",
      Dinner: "Baked sea bass with olives and tomato"
    },
    Tuesday: {
      Breakfast: "Spinach feta omelet",
      Lunch: "Tuna and chickpea-style salad (extra greens, minimal chickpeas)",
      Dinner: "Lemon herb chicken with roasted zucchini"
    },
    Wednesday: {
      Breakfast: "Labneh bowl with cucumber and mint",
      Lunch: "Turkey kofta with cucumber salad",
      Dinner: "Garlic shrimp with sauteed spinach"
    },
    Thursday: {
      Breakfast: "Scrambled eggs with tomato and feta",
      Lunch: "Salmon Nicoise-style salad (no potatoes)",
      Dinner: "Lamb kebabs with grilled peppers"
    },
    Friday: {
      Breakfast: "Chia pudding with almonds",
      Lunch: "Halloumi and avocado salad",
      Dinner: "Stuffed eggplant with minced beef and herbs"
    },
    Saturday: {
      Breakfast: "Herb omelet with olives",
      Lunch: "Chicken shawarma bowl over cauliflower rice",
      Dinner: "Roasted cod with fennel and lemon"
    },
    Sunday: {
      Breakfast: "Yogurt with pistachios",
      Lunch: "Mediterranean antipasto protein plate",
      Dinner: "Beef moussaka-style bake (no potato)"
    }
  },
  Australia: {
    Monday: {
      Breakfast: "Avocado eggs with grilled tomato",
      Lunch: "Chicken and macadamia salad",
      Dinner: "Barramundi with lemon asparagus"
    },
    Tuesday: {
      Breakfast: "Greek yogurt with berries and almonds",
      Lunch: "Beef burger bowl with pickles",
      Dinner: "Lamb chops with minty greens"
    },
    Wednesday: {
      Breakfast: "Mushroom and cheddar omelet",
      Lunch: "Tuna and avocado lettuce boats",
      Dinner: "Garlic prawns with zucchini ribbons"
    },
    Thursday: {
      Breakfast: "Egg muffins with spinach",
      Lunch: "Roast chicken salad with pumpkin seeds",
      Dinner: "Steak with sauteed broccoli"
    },
    Friday: {
      Breakfast: "Smoked salmon and cream cheese roll-ups",
      Lunch: "Turkey and egg cobb salad",
      Dinner: "Baked snapper with green beans"
    },
    Saturday: {
      Breakfast: "Chia pudding with coconut milk",
      Lunch: "Chicken satay salad",
      Dinner: "Pork loin with cauliflower mash"
    },
    Sunday: {
      Breakfast: "Bacon and eggs with spinach",
      Lunch: "Roast beef salad bowl",
      Dinner: "Herb chicken tray bake with zucchini"
    }
  },
  Canada: {
    Monday: {
      Breakfast: "Scrambled eggs with smoked salmon",
      Lunch: "Grilled chicken kale Caesar (no croutons)",
      Dinner: "Maple mustard salmon with broccoli"
    },
    Tuesday: {
      Breakfast: "Greek yogurt with pecans",
      Lunch: "Turkey club lettuce wraps",
      Dinner: "Beef and mushroom skillet"
    },
    Wednesday: {
      Breakfast: "Spinach feta omelet",
      Lunch: "Tuna salad stuffed peppers",
      Dinner: "Roast chicken with Brussels sprouts"
    },
    Thursday: {
      Breakfast: "Cottage cheese with chia and almonds",
      Lunch: "Egg salad avocado bowl",
      Dinner: "Pork chops with cabbage slaw"
    },
    Friday: {
      Breakfast: "Bacon egg cups with peppers",
      Lunch: "Shrimp and cucumber dill salad",
      Dinner: "Baked cod with cauliflower mash"
    },
    Saturday: {
      Breakfast: "Protein smoothie bowl (low-carb)",
      Lunch: "Chicken and cheddar salad",
      Dinner: "Steak with garlic green beans"
    },
    Sunday: {
      Breakfast: "Mushroom and egg skillet",
      Lunch: "Roast turkey salad plate",
      Dinner: "Slow-cooked beef with roasted vegetables"
    }
  }
};

const GENERIC_LOW_CARB_PLAN = {
  Monday: { Breakfast: "Egg scramble with mixed vegetables", Lunch: "Grilled chicken salad", Dinner: "Baked fish with steamed greens" },
  Tuesday: { Breakfast: "Greek yogurt with nuts", Lunch: "Turkey lettuce wraps", Dinner: "Beef and broccoli stir-fry" },
  Wednesday: { Breakfast: "Cheese omelet with spinach", Lunch: "Tuna avocado salad", Dinner: "Roast chicken with cauliflower mash" },
  Thursday: { Breakfast: "Cottage cheese and almonds", Lunch: "Egg salad bowl", Dinner: "Shrimp with garlic zucchini" },
  Friday: { Breakfast: "Smoked fish and boiled eggs", Lunch: "Chicken Caesar salad (no croutons)", Dinner: "Pork chops with green beans" },
  Saturday: { Breakfast: "Chia pudding (unsweetened)", Lunch: "Beef burger patty with side salad", Dinner: "Salmon and asparagus" },
  Sunday: { Breakfast: "Veggie frittata", Lunch: "Grilled tofu and vegetable bowl", Dinner: "Roast beef with sauteed cabbage" }
};

const state = {
  lastResult: null,
  selectedDay: "All",
  customGroceries: []
};

const PREFERENCES_KEY = "lc_meal_planner_preferences";

const dayFilterEl = document.getElementById("dayFilter");
const countryEl = document.getElementById("country");
const goalEl = document.getElementById("goal");
const dailyTargetEl = document.getElementById("dailyTarget");
const recommendedTargetTextEl = document.getElementById("recommendedTargetText");
const summaryEl = document.getElementById("summary");
const planOutputEl = document.getElementById("planOutput");
const groceryOutputEl = document.getElementById("groceryOutput");
const generateBtn = document.getElementById("generateBtn");
const savePrefBtn = document.getElementById("savePrefBtn");
const clearPrefBtn = document.getElementById("clearPrefBtn");
const downloadTxtBtn = document.getElementById("downloadTxtBtn");
const downloadCsvBtn = document.getElementById("downloadCsvBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const sexEl = document.getElementById("sex");
const ageEl = document.getElementById("age");
const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");
const activityEl = document.getElementById("activity");
const carbModeEl = document.getElementById("carbMode");
const mealScheduleEl = document.getElementById("mealSchedule");
const macroSummaryEl = document.getElementById("macroSummary");
const bmiResultEl = document.getElementById("bmiResult");
const heroTitleEl = document.querySelector(".hero h1");
const themeToggleBtn = document.getElementById("themeToggle");
const planCountHintEl = document.getElementById("planCountHint");
const installIosBtn = document.getElementById("installIosBtn");
const installAndroidBtn = document.getElementById("installAndroidBtn");
const installStatusEl = document.getElementById("installStatus");

let deferredInstallPrompt = null;


const THEME_PREFERENCE_KEY = "lc_meal_planner_theme";

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nextTheme);

  if (themeToggleBtn) {
    const isDark = nextTheme === "dark";
    themeToggleBtn.setAttribute("aria-pressed", String(isDark));
    themeToggleBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem(THEME_PREFERENCE_KEY);
  applyTheme(savedTheme || "light");
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_PREFERENCE_KEY, nextTheme);
  applyTheme(nextTheme);
}

function savePreferences() {
  const prefs = {
    country: countryEl.value,
    goal: goalEl.value,
    dailyTarget: dailyTargetEl.value,
    sex: sexEl ? sexEl.value : "",
    age: ageEl ? ageEl.value : "",
    height: heightEl ? heightEl.value : "",
    weight: weightEl ? weightEl.value : "",
    activity: activityEl ? activityEl.value : "",
    carbMode: carbModeEl ? carbModeEl.value : "moderate",
    mealSchedule: mealScheduleEl ? mealScheduleEl.value : "3"
  };
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));

  const originalLabel = savePrefBtn.textContent;
  savePrefBtn.textContent = "Saved";
  savePrefBtn.disabled = true;
  setTimeout(() => {
    savePrefBtn.textContent = originalLabel;
    savePrefBtn.disabled = false;
  }, 900);
}

function loadPreferences() {
  const raw = localStorage.getItem(PREFERENCES_KEY);
  if (!raw) {
    return;
  }

  try {
    const prefs = JSON.parse(raw);

    if (prefs.country && COUNTRY_BASE_TARGETS[prefs.country] !== undefined) {
      countryEl.value = prefs.country;
    }
    if (prefs.goal && GOAL_ADJUSTMENTS[prefs.goal] !== undefined) {
      goalEl.value = prefs.goal;
    }
    if (sexEl && prefs.sex) {
      sexEl.value = prefs.sex;
    }
    if (ageEl && prefs.age !== undefined) {
      ageEl.value = prefs.age;
    }
    if (heightEl && prefs.height !== undefined) {
      heightEl.value = prefs.height;
    }
    if (weightEl && prefs.weight !== undefined) {
      weightEl.value = prefs.weight;
    }
    if (activityEl && prefs.activity) {
      activityEl.value = prefs.activity;
    }
    if (carbModeEl && prefs.carbMode) {
      carbModeEl.value = prefs.carbMode;
    }
    if (mealScheduleEl && prefs.mealSchedule) {
      mealScheduleEl.value = prefs.mealSchedule;
    }

    if (prefs.dailyTarget !== undefined && prefs.dailyTarget !== null && String(prefs.dailyTarget).trim() !== "") {
      const parsed = Number(prefs.dailyTarget);
      if (Number.isFinite(parsed) && parsed >= 1000 && parsed <= 3500) {
        dailyTargetEl.value = String(Math.round(parsed));
      }
    }
  } catch {
    // Ignore invalid saved preferences and continue with defaults.
  }
}

function clearPreferences() {
  localStorage.removeItem(PREFERENCES_KEY);

  countryEl.value = "UK";
  goalEl.value = "Maintain";
  if (sexEl) sexEl.value = "male";
  if (ageEl) ageEl.value = "";
  if (heightEl) heightEl.value = "";
  if (weightEl) weightEl.value = "";
  if (activityEl) activityEl.value = "1.55";
  if (carbModeEl) carbModeEl.value = "moderate";
  if (mealScheduleEl) mealScheduleEl.value = "3";
  dailyTargetEl.value = "";
  updateBMI();
  updateRecommendedTargetText();

  const originalLabel = clearPrefBtn.textContent;
  clearPrefBtn.textContent = "Cleared";
  clearPrefBtn.disabled = true;
  setTimeout(() => {
    clearPrefBtn.textContent = originalLabel;
    clearPrefBtn.disabled = false;
  }, 900);
}


function calculateTDEE() {
  if (!sexEl || !ageEl || !heightEl || !weightEl || !activityEl) {
    return null;
  }

  const age = Number(ageEl.value);
  const height = Number(heightEl.value);
  const weight = Number(weightEl.value);
  const activity = Number(activityEl.value);
  const sex = sexEl.value;

  if (!Number.isFinite(age) || !Number.isFinite(height) || !Number.isFinite(weight) || !Number.isFinite(activity)) {
    return null;
  }

  if (age <= 0 || height <= 0 || weight <= 0) {
    return null;
  }

  let bmr;
  if (sex === "male") {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  return Math.round(bmr * activity);
}


function calculateBMI() {
  if (!heightEl || !weightEl) {
    return null;
  }

  const heightCm = Number(heightEl.value);
  const weightKg = Number(weightEl.value);

  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return {
      label: "Underweight",
      className: "underweight",
      suggestion: "Suggested goal: Maintain or gain weight with a slight calorie increase."
    };
  }

  if (bmi < 25) {
    return {
      label: "Healthy range",
      className: "normal",
      suggestion: "Suggested goal: Maintain weight, unless you have a different fitness target."
    };
  }

  if (bmi < 30) {
    return {
      label: "Overweight",
      className: "overweight",
      suggestion: "Suggested goal: Lose weight with a mild calorie deficit."
    };
  }

  return {
    label: "Obese",
    className: "obese",
    suggestion: "Suggested goal: Lose weight with a structured calorie deficit."
  };
}

function updateBMI() {
  if (!bmiResultEl) {
    return;
  }

  const bmi = calculateBMI();
  if (!bmi) {
    bmiResultEl.className = "bmi-result hidden";
    bmiResultEl.innerHTML = "";
    return;
  }

  const info = getBMICategory(bmi);
  bmiResultEl.className = `bmi-result ${info.className}`;
  bmiResultEl.innerHTML = `
    <div class="bmi-value-row">
      <span class="bmi-title">BMI and goal suggestion</span>
      <strong class="bmi-value">${bmi} · ${info.label}</strong>
    </div>
    <p class="bmi-suggestion">${info.suggestion}</p>
  `;
}

function autoFillCalories() {
  const recommended = getRecommendedDailyTarget(countryEl.value, goalEl.value);
  const raw = String(dailyTargetEl.value).trim();

  if (!raw) {
    dailyTargetEl.value = String(recommended);
  }

  updateBMI();
  updateRecommendedTargetText();
}

function getRecommendedDailyTarget(country, goal) {
  const tdee = calculateTDEE();
  let base = tdee ?? (COUNTRY_BASE_TARGETS[country] ?? DEFAULT_DAILY_CALORIE_TARGET);

  if (goal === "Lose weight") {
    base *= 0.8;
  } else if (goal === "Gain muscle") {
    base *= 1.15;
  }

  return Math.round(base);
}

function getDailyTarget(country, goal) {
  const fallback = getRecommendedDailyTarget(country, goal);
  const raw = Number(dailyTargetEl.value);
  if (!Number.isFinite(raw)) {
    return fallback;
  }
  if (raw < 1000 || raw > 3500) {
    return fallback;
  }
  return Math.round(raw);
}

function getCalorieProfile(country) {
  return COUNTRY_CALORIE_PROFILES[country] ?? COUNTRY_CALORIE_PROFILES.UK;
}

function shufflePlan(plan) {
  const days = Object.keys(plan);
  const meals = days.map((d) => plan[d]);
  for (let i = meals.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [meals[i], meals[j]] = [meals[j], meals[i]];
  }
  const shuffled = {};
  days.forEach((day, i) => { shuffled[day] = meals[i]; });
  return shuffled;
}

function pickRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildExpandedMealPool(basePlan, mealType) {
  const baseItems = [...new Set(WEEK_DAYS.map((day) => basePlan[day]?.[mealType]).filter(Boolean))];
  const templates = MEAL_VARIATION_TEMPLATES[mealType] ?? ["{base}"];
  const expanded = [];

  baseItems.forEach((item) => {
    templates.forEach((template) => {
      expanded.push(template.replace("{base}", item));
    });
  });

  return [...new Set(expanded)];
}

function buildGeneratedWeeklyPlan(basePlan) {
  const pools = {
    Breakfast: buildExpandedMealPool(basePlan, "Breakfast"),
    Lunch: buildExpandedMealPool(basePlan, "Lunch"),
    Dinner: buildExpandedMealPool(basePlan, "Dinner")
  };

  const weeklyPlan = {};
  const usedByMealType = {
    Breakfast: new Set(),
    Lunch: new Set(),
    Dinner: new Set()
  };

  WEEK_DAYS.forEach((day) => {
    weeklyPlan[day] = {};

    ["Breakfast", "Lunch", "Dinner"].forEach((mealType) => {
      const available = pools[mealType].filter((item) => !usedByMealType[mealType].has(item));
      const sourcePool = available.length ? available : pools[mealType];
      const picked = pickRandomItem(sourcePool);
      weeklyPlan[day][mealType] = picked;
      usedByMealType[mealType].add(picked);
    });
  });

  return weeklyPlan;
}

function formatLargeCount(value) {
  if (!Number.isFinite(value) || value < 0) {
    return "100+";
  }
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B+`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M+`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K+`;
  }
  return `${Math.max(100, Math.floor(value))}+`;
}

function getEstimatedWeeklyCombinations(country) {
  const basePlan = MEAL_PLANS[country] ?? MEAL_PLANS.UK;
  const scheduleConfig = getMealScheduleConfig();

  const perDayCombinations = scheduleConfig.mealOrder.reduce((total, mealType) => {
    const poolSize = buildExpandedMealPool(basePlan, mealType).length;
    return total * Math.max(poolSize, 1);
  }, 1);

  return Math.pow(perDayCombinations, WEEK_DAYS.length);
}

function updatePlanCountHint() {
  if (!planCountHintEl) {
    return;
  }
  const estimated = getEstimatedWeeklyCombinations(countryEl.value);
  planCountHintEl.textContent = `${formatLargeCount(estimated)} possible weekly menu combinations`;
}
function updateIosInstallHint() {
  const hintEl = document.getElementById("iosInstallHint");
  const dismissBtn = document.getElementById("dismissIosInstallHint");

  if (!hintEl) {
    return;
  }

  const dismissed = localStorage.getItem("iosInstallHintDismissed") === "1";
  if (dismissed) {
    hintEl.classList.add("hidden");
    return;
  }

  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

  if (isIOS && isSafari && !isStandalone) {
    hintEl.classList.remove("hidden");
  } else {
    hintEl.classList.add("hidden");
  }

  if (dismissBtn && !dismissBtn.dataset.bound) {
    dismissBtn.addEventListener("click", () => {
      localStorage.setItem("iosInstallHintDismissed", "1");
      hintEl.classList.add("hidden");
    });
    dismissBtn.dataset.bound = "1";
  }
}

function setupInstallButtons() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

  if (installStatusEl) {
    installStatusEl.textContent = isStandalone
      ? "App is already installed on this device."
      : "Tap Install on iOS or Install on Android.";
  }

  if (installIosBtn) {
    installIosBtn.addEventListener("click", () => {
      alert(
        isIOS
          ? "Install on iPhone: open this page in Safari, tap Share, then tap Add to Home Screen."
          : "For iOS install, open this page on iPhone/iPad in Safari, then tap Share > Add to Home Screen."
      );
    });
  }

  if (installAndroidBtn) {
    installAndroidBtn.addEventListener("click", async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choiceResult = await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        if (installStatusEl) {
          installStatusEl.textContent = choiceResult.outcome === "accepted"
            ? "Android install started."
            : "Install canceled. You can tap Install on Android anytime.";
        }
        return;
      }

      alert("On Android Chrome: tap browser menu (three dots) and choose Install app or Add to Home screen.");
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (installStatusEl) {
      installStatusEl.textContent = "Android install is ready. Tap Install on Android.";
    }
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    if (installStatusEl) {
      installStatusEl.textContent = "App installed successfully.";
    }
  });
}

function getMealPlan(country) {
  const basePlan = MEAL_PLANS[country] ?? MEAL_PLANS.UK;
  const generatedPlan = buildGeneratedWeeklyPlan(basePlan);
  return shufflePlan(generatedPlan);
}

function updateRecommendedTargetText() {
  const target = getRecommendedDailyTarget(countryEl.value, goalEl.value);
  const currentValue = Number(dailyTargetEl.value);
  const hasManualValue = Number.isFinite(currentValue) && String(dailyTargetEl.value).trim() !== "";
  const tdee = calculateTDEE();

  if (hasManualValue && Math.round(currentValue) !== target) {
    recommendedTargetTextEl.textContent = tdee
      ? `Recommended target: ${target} kcal · Using manual target: ${Math.round(currentValue)} kcal`
      : `Recommended target: ${target} kcal · Using manual target: ${Math.round(currentValue)} kcal`;
    return;
  }

  recommendedTargetTextEl.textContent = tdee
    ? `Recommended target: ${target} kcal`
    : `Recommended target: ${target} kcal`;
}

function getGroceryList(plan) {
  const groceries = {
    Protein: [],
    Vegetables: [],
    "Pantry and Extras": [],
    Other: []
  };

  const combinedText = Object.values(plan)
    .map((meals) => Object.values(meals).join(" "))
    .join(" ")
    .toLowerCase();

  Object.entries(GROCERY_CATEGORIES).forEach(([category, keywords]) => {
    keywords.forEach((keyword) => {
      if (combinedText.includes(keyword) && !groceries[category].includes(keyword)) {
        groceries[category].push(keyword);
      }
    });
  });

  if (combinedText.includes("caesar") && !groceries.Other.includes("caesar dressing")) {
    groceries.Other.push("caesar dressing");
  }

  return groceries;
}





function getMealScheduleConfig() {
  const schedule = mealScheduleEl ? mealScheduleEl.value : "3";
  return MEAL_SCHEDULES[schedule] ?? MEAL_SCHEDULES["3"];
}

function getScheduledMealPlan(plan) {
  const scheduleConfig = getMealScheduleConfig();
  const scheduled = {};

  Object.entries(plan).forEach(([day, meals]) => {
    const nextMeals = {};
    scheduleConfig.mealOrder.forEach((mealKey) => {
      nextMeals[mealKey] = meals[mealKey];
    });
    scheduled[day] = nextMeals;
  });

  return scheduled;
}

function getScheduledCalorieProfile(baseProfile, dailyTarget) {
  const scheduleConfig = getMealScheduleConfig();
  const profile = {};

  scheduleConfig.mealOrder.forEach((mealKey) => {
    profile[mealKey] = Math.round(dailyTarget * scheduleConfig.splits[mealKey]);
  });

  return profile;
}

function getCarbModeConfig() {
  const mode = carbModeEl ? carbModeEl.value : "moderate";
  return CARB_MODE_MACROS[mode] ?? CARB_MODE_MACROS.moderate;
}

function getMacroBreakdown(dailyTarget) {
  const config = getCarbModeConfig();
  const carbsGrams = Math.round((dailyTarget * config.carbsPct) / 4);
  const proteinGrams = Math.round((dailyTarget * config.proteinPct) / 4);
  const fatGrams = Math.round((dailyTarget * config.fatPct) / 9);

  return {
    modeLabel: config.carbLabel,
    carbsGrams,
    proteinGrams,
    fatGrams,
    carbPercent: Math.round(config.carbsPct * 100),
    proteinPercent: Math.round(config.proteinPct * 100),
    fatPercent: Math.round(config.fatPct * 100)
  };
}

function getMealIconSvg(mealName) {
  if (mealName === "Breakfast") {
    return `
      <span class="meal-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3.25"></circle>
          <path d="M12 2.75v2.5M12 18.75v2.5M4.75 12h2.5M16.75 12h2.5M6.7 6.7l1.8 1.8M15.5 15.5l1.8 1.8M6.7 17.3l1.8-1.8M15.5 8.5l1.8-1.8"></path>
        </svg>
      </span>`;
  }
  if (mealName === "Lunch") {
    return `
      <span class="meal-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6 3v8"></path>
          <path d="M9 3v8"></path>
          <path d="M7.5 11v10"></path>
          <path d="M15 3v8"></path>
          <path d="M15 11c0-2.8 1.7-4.8 4-5v15"></path>
        </svg>
      </span>`;
  }
  return `
    <span class="meal-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M17 14.5A5.5 5.5 0 1 1 9.5 7 7.5 7.5 0 1 0 17 14.5Z"></path>
      </svg>
    </span>`;
}

function getDailyStatusText(dailyEstimate, dailyTarget) {
  const delta = dailyEstimate - dailyTarget;
  if (delta > 0) {
    return {
      text: `+${delta} kcal over target`,
      className: "over"
    };
  }
  if (delta === 0) {
    return {
      text: "Within target",
      className: "within"
    };
  }
  return {
    text: `${Math.abs(delta)} kcal under target`,
    className: "within"
  };
}

function renderPlanCards(plan, calorieProfile, dailyTarget, filterDay) {
  planOutputEl.innerHTML = "";

  const entries = filterDay === "All"
    ? Object.entries(plan)
    : Object.entries(plan).filter(([day]) => day === filterDay);

  entries.forEach(([day, meals]) => {
    let dailyEstimate = 0;
    const card = document.createElement("article");
    card.className = "day-card";

    const headingWrap = document.createElement("div");
    headingWrap.className = "day-card-header";

    const heading = document.createElement("h3");
    heading.textContent = day;

    const regenBtn = document.createElement("button");
    regenBtn.type = "button";
    regenBtn.className = "regen-btn";
    regenBtn.textContent = "↻ Regenerate";
    regenBtn.addEventListener("click", () => regenerateDay(day));

    headingWrap.appendChild(heading);
    headingWrap.appendChild(regenBtn);
    card.appendChild(headingWrap);

    const scheduleConfig = getMealScheduleConfig();

    Object.entries(meals).forEach(([mealName, suggestion]) => {
      const est = calorieProfile[mealName] ?? 500;
      const portion = PORTION_BY_MEAL[mealName] ?? "1 serving";
      const mealLabel = scheduleConfig.mealLabels[mealName] ?? mealName;
      dailyEstimate += est;

      const mealBlock = document.createElement("section");
      mealBlock.className = `meal-block ${mealName.toLowerCase()}`;

      const mealHeader = document.createElement("div");
      mealHeader.className = "meal-header";
      mealHeader.innerHTML = `${getMealIconSvg(mealName)}<span>${mealLabel}</span>`;

      const mealNameText = document.createElement("p");
      mealNameText.className = "meal-name";
      mealNameText.textContent = suggestion;

      const metaWrap = document.createElement("div");
      metaWrap.className = "meal-meta";

      const portionPill = document.createElement("span");
      portionPill.className = "meta-pill";
      portionPill.textContent = `Portion: ${portion}`;

      const caloriesPill = document.createElement("span");
      caloriesPill.className = "meta-pill";
      caloriesPill.textContent = `Calories: ${est} kcal`;

      metaWrap.appendChild(portionPill);
      metaWrap.appendChild(caloriesPill);

      mealBlock.appendChild(mealHeader);
      mealBlock.appendChild(mealNameText);
      mealBlock.appendChild(metaWrap);

      if (scheduleConfig.mealOrder.length < 3) {
        const scheduleNote = document.createElement("p");
        scheduleNote.className = "schedule-note";
        scheduleNote.textContent = scheduleConfig.mealOrder.length === 1
          ? "One larger meal for the day."
          : "Designed as part of a two-meal day.";
        mealBlock.appendChild(scheduleNote);
      }

      card.appendChild(mealBlock);
    });

    const dailyStatus = getDailyStatusText(dailyEstimate, dailyTarget);

    const totalWrap = document.createElement("section");
    totalWrap.className = "daily-total";

    const totalValue = document.createElement("p");
    totalValue.className = "daily-total-value";
    totalValue.textContent = `Daily Estimated Total: ${dailyEstimate} kcal`;

    const totalStatus = document.createElement("p");
    totalStatus.className = `daily-total-status ${dailyStatus.className}`;
    totalStatus.textContent = `${dailyStatus.text} (Target: ${dailyTarget} kcal)`;

    totalWrap.appendChild(totalValue);
    totalWrap.appendChild(totalStatus);
    card.appendChild(totalWrap);

    planOutputEl.appendChild(card);
  });
}


function renderMacroSummary(dailyTarget) {
  if (!macroSummaryEl) {
    return;
  }

  const macros = getMacroBreakdown(dailyTarget);
  macroSummaryEl.classList.remove("hidden");
  macroSummaryEl.innerHTML = "";

  const cards = [
    {
      label: "Mode",
      value: macros.modeLabel,
      subtext: `${macros.carbPercent}% carbs · ${getMealScheduleConfig().label}`
    },
    {
      label: "Carbs",
      value: `${macros.carbsGrams}g`,
      subtext: `${macros.carbPercent}% of calories`
    },
    {
      label: "Protein",
      value: `${macros.proteinGrams}g`,
      subtext: `${macros.proteinPercent}% of calories`
    },
    {
      label: "Fat",
      value: `${macros.fatGrams}g`,
      subtext: `${macros.fatPercent}% of calories`
    }
  ];

  cards.forEach((item) => {
    const card = document.createElement("article");
    card.className = "macro-card";

    const label = document.createElement("p");
    label.className = "macro-label";
    label.textContent = item.label;

    const value = document.createElement("p");
    value.className = "macro-value";
    value.textContent = item.value;

    const subtext = document.createElement("p");
    subtext.className = "macro-subtext";
    subtext.textContent = item.subtext;

    card.appendChild(label);
    card.appendChild(value);
    card.appendChild(subtext);
    macroSummaryEl.appendChild(card);
  });
}

function renderResult(country, goal, dailyTarget, plan, calorieProfile, groceries) {
  summaryEl.classList.remove("hidden");
  const modeLabel = getCarbModeConfig().carbLabel;
  const scheduleLabel = getMealScheduleConfig().label;
  summaryEl.textContent = `Cuisine Style: ${country} | Goal: ${goal} | Daily target: ${dailyTarget} kcal | Mode: ${modeLabel} | Schedule: ${scheduleLabel}`;

  renderMacroSummary(dailyTarget);
  dayFilterEl.classList.remove("hidden");

  renderPlanCards(plan, calorieProfile, dailyTarget, state.selectedDay);

  renderGroceryList(groceries);
}

function renderGroceryList(groceries) {
  groceryOutputEl.classList.remove("hidden");
  groceryOutputEl.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Weekly Grocery List";
  groceryOutputEl.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "grocery-grid";

  // Merge custom items into Other before rendering
  const mergedGroceries = Object.assign({}, groceries);
  mergedGroceries.Other = [
    ...(groceries.Other || []),
    ...state.customGroceries.filter((item) => !(groceries.Other || []).includes(item))
  ];

  Object.entries(mergedGroceries).forEach(([category, items]) => {
    const isOther = category === "Other";
    if (!items.length && !isOther) {
      return;
    }
    const col = document.createElement("section");
    col.className = "grocery-col";

    const h3 = document.createElement("h3");
    h3.textContent = category;
    col.appendChild(h3);

    const ul = document.createElement("ul");
    [...items].sort().forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    col.appendChild(ul);

    if (isOther) {
      const addRow = document.createElement("div");
      addRow.className = "grocery-add-row";

      const input = document.createElement("input");
      input.type = "text";
      input.className = "grocery-add-input";
      input.placeholder = "Add an item...";

      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "grocery-add-btn";
      addBtn.textContent = "+ Add";

      function addItem() {
        const val = input.value.trim().toLowerCase();
        if (!val || state.customGroceries.includes(val)) {
          input.value = "";
          return;
        }
        state.customGroceries.push(val);
        input.value = "";
        renderGroceryList(state.lastResult.groceries);
      }

      addBtn.addEventListener("click", addItem);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          addItem();
        }
      });

      addRow.appendChild(input);
      addRow.appendChild(addBtn);
      col.appendChild(addRow);
    }

    grid.appendChild(col);
  });

  groceryOutputEl.appendChild(grid);
}

function regenerateDay(day) {
  if (!state.lastResult) {
    return;
  }
  const { plan, calorieProfile, dailyTarget } = state.lastResult;
  const otherDays = Object.keys(plan).filter((d) => d !== day);
  if (otherDays.length === 0) {
    return;
  }

  // Swap each meal type independently with a random other day so no duplicates occur
  Object.keys(state.lastResult.plan[day]).forEach((mealType) => {
    const swapDay = otherDays[Math.floor(Math.random() * otherDays.length)];
    const temp = state.lastResult.plan[day][mealType];
    state.lastResult.plan[day][mealType] = state.lastResult.plan[swapDay][mealType];
    state.lastResult.plan[swapDay][mealType] = temp;
  });

  state.lastResult.groceries = getGroceryList(state.lastResult.plan);
  renderPlanCards(state.lastResult.plan, calorieProfile, dailyTarget, state.selectedDay);
  renderGroceryList(state.lastResult.groceries);
}

function buildTxtContent(result) {
  const lines = [];
  lines.push("Low-Carb Weekly Meal Suggestion");
  lines.push(`Cuisine Style: ${result.country}`);
  lines.push(`Goal: ${result.goal}`);
  lines.push(`Daily Calorie Target: ${result.dailyTarget} kcal`);
  lines.push("");

  Object.entries(result.plan).forEach(([day, meals]) => {
    lines.push(day);
    lines.push("-".repeat(day.length));
    let dailyEstimate = 0;

    Object.entries(meals).forEach(([mealName, suggestion]) => {
      const est = result.calorieProfile[mealName] ?? 500;
      const portion = PORTION_BY_MEAL[mealName] ?? "1 serving";
      dailyEstimate += est;
      lines.push(`${mealName}: ${suggestion} | Portion: ${portion} | Est: ${est} kcal`);
    });

    lines.push(`Daily Estimated Total: ${dailyEstimate} kcal (Target: ${result.dailyTarget} kcal)`);
    lines.push("");
  });

  lines.push("Weekly Grocery List");
  lines.push("===================");

  Object.entries(result.groceries).forEach(([category, items]) => {
    if (!items.length) {
      return;
    }
    lines.push("");
    lines.push(category);
    lines.push("-".repeat(category.length));
    [...items].sort().forEach((item) => lines.push(`- ${item}`));
  });

  return lines.join("\n");
}

function csvEscape(value) {
  const stringValue = String(value ?? "");
  if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function buildCsvContent(result) {
  const rows = [
    ["row_type", "country", "goal", "day", "meal", "suggestion", "portion", "estimated_kcal", "daily_target", "category", "item"]
  ];

  Object.entries(result.plan).forEach(([day, meals]) => {
    Object.entries(meals).forEach(([mealName, suggestion]) => {
      rows.push([
        "meal",
        result.country,
        result.goal,
        day,
        mealName,
        suggestion,
        PORTION_BY_MEAL[mealName] ?? "1 serving",
        result.calorieProfile[mealName] ?? 500,
        result.dailyTarget,
        "",
        ""
      ]);
    });
  });

  Object.entries(result.groceries).forEach(([category, items]) => {
    [...items].sort().forEach((item) => {
      rows.push([
        "grocery",
        result.country,
        result.goal,
        "",
        "",
        "",
        "",
        "",
        result.dailyTarget,
        category,
        item
      ]);
    });
  });

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function downloadText(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function getTimestamp() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}_${hh}${min}${sec}`;
}

function downloadTxt(result) {
  const timestamp = getTimestamp();
  const country = result.country.toLowerCase().replace(/\s+/g, "_");
  downloadText(buildTxtContent(result), `weekly_plan_${country}_${timestamp}.txt`, "text/plain;charset=utf-8");
}

function downloadCsv(result) {
  const timestamp = getTimestamp();
  const country = result.country.toLowerCase().replace(/\s+/g, "_");
  downloadText(buildCsvContent(result), `weekly_plan_${country}_${timestamp}.csv`, "text/csv;charset=utf-8");
}

function generatePlan() {
  const country = countryEl.value;
  const goal = goalEl.value;
  const dailyTarget = getDailyTarget(country, goal);
  const fullPlan = getMealPlan(country);
  const plan = getScheduledMealPlan(fullPlan);
  const baseCalorieProfile = getCalorieProfile(country);
  const calorieProfile = getScheduledCalorieProfile(baseCalorieProfile, dailyTarget);
  const groceries = getGroceryList(plan);

  // Reset filter to All Week on fresh generate
  state.selectedDay = "All";
  state.customGroceries = [];
  dayFilterEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  dayFilterEl.querySelector("[data-day='All']").classList.add("active");

  state.originalPlan = JSON.parse(JSON.stringify(plan));
  state.lastResult = { country, goal, dailyTarget, carbMode: carbModeEl ? carbModeEl.value : "moderate", mealSchedule: mealScheduleEl ? mealScheduleEl.value : "3", plan, calorieProfile, groceries };

  renderResult(country, goal, dailyTarget, plan, calorieProfile, groceries);
  if (downloadTxtBtn) {
    downloadTxtBtn.disabled = false;
  }
  if (downloadCsvBtn) {
    downloadCsvBtn.disabled = false;
  }
  if (exportPdfBtn) {
    exportPdfBtn.disabled = false;
  }
}

countryEl.addEventListener("change", () => {
  updatePlanCountHint();
  if (!String(dailyTargetEl.value).trim()) {
    autoFillCalories();
  } else {
    updateRecommendedTargetText();
  }
});
goalEl.addEventListener("change", () => {
  if (!String(dailyTargetEl.value).trim()) {
    autoFillCalories();
  } else {
    updateRecommendedTargetText();
  }
});
dailyTargetEl.addEventListener("input", updateRecommendedTargetText);

[sexEl, ageEl, heightEl, weightEl, activityEl, carbModeEl, mealScheduleEl].filter(Boolean).forEach((el) => {
  const handler = () => {
    if (el === mealScheduleEl) {
      updatePlanCountHint();
    }
    autoFillCalories();
    if (state.lastResult && (el === carbModeEl || el === mealScheduleEl)) {
      const dailyTarget = getDailyTarget(countryEl.value, goalEl.value);
      const fullPlan = getMealPlan(state.lastResult.country);
      const scheduledPlan = getScheduledMealPlan(fullPlan);
      const calorieProfile = getScheduledCalorieProfile(getCalorieProfile(state.lastResult.country), dailyTarget);
      const groceries = getGroceryList(scheduledPlan);

      state.lastResult = {
        ...state.lastResult,
        dailyTarget,
        carbMode: carbModeEl ? carbModeEl.value : "moderate",
        mealSchedule: mealScheduleEl ? mealScheduleEl.value : "3",
        plan: scheduledPlan,
        calorieProfile,
        groceries
      };

      renderMacroSummary(dailyTarget);
      summaryEl.textContent = `Cuisine Style: ${state.lastResult.country} | Goal: ${state.lastResult.goal} | Daily target: ${dailyTarget} kcal | Mode: ${getCarbModeConfig().carbLabel} | Schedule: ${getMealScheduleConfig().label}`;
      renderPlanCards(state.lastResult.plan, state.lastResult.calorieProfile, dailyTarget, state.selectedDay);
      renderGroceryList(state.lastResult.groceries);
    }
  };
  el.addEventListener("input", handler);
  el.addEventListener("change", handler);
});

dayFilterEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn || !state.lastResult) {
    return;
  }
  state.selectedDay = btn.dataset.day;
  dayFilterEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const { plan, calorieProfile, dailyTarget } = state.lastResult;
  renderPlanCards(plan, calorieProfile, dailyTarget, state.selectedDay);
});

generateBtn.addEventListener("click", generatePlan);
if (savePrefBtn) {
  savePrefBtn.addEventListener("click", savePreferences);
}
if (clearPrefBtn) {
  clearPrefBtn.addEventListener("click", clearPreferences);
}

if (downloadTxtBtn) {
  downloadTxtBtn.addEventListener("click", () => {
    if (state.lastResult) {
      downloadTxt(state.lastResult);
    }
  });
}

if (downloadCsvBtn) {
  downloadCsvBtn.addEventListener("click", () => {
    if (state.lastResult) {
      downloadCsv(state.lastResult);
    }
  });
}

if (exportPdfBtn) {
  exportPdfBtn.addEventListener("click", () => {
    if (!state.lastResult) return;
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert("PDF export library is not loaded.");
      return;
    }
    const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const result = state.lastResult;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 15;
  const colW = pageW - margin * 2;
  let y = margin;

  function checkPage(needed) {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function writeLine(text, opts) {
    const { size = 10, bold = false, color = [30, 30, 30], indent = 0 } = opts || {};
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, colW - indent);
    lines.forEach((line) => {
      checkPage(6);
      doc.text(line, margin + indent, y);
      y += size * 0.45;
    });
  }

  function drawRule(thickness, grayVal) {
    doc.setDrawColor(grayVal ?? 180);
    doc.setLineWidth(thickness ?? 0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 3;
  }

  // ---- Header ----
  writeLine("LOW-CARB PLANNER", { size: 9, bold: false, color: [80, 100, 160] });
  y += 2;
  writeLine("Your LC Meal Companion", { size: 18, bold: true, color: [20, 20, 20] });
  y += 2;
  writeLine(`Cuisine Style: ${result.country}  |  Goal: ${result.goal}  |  Daily target: ${result.dailyTarget} kcal`, { size: 9, color: [100, 100, 100] });
  y += 4;
  drawRule(0.5, 150);
  y += 2;

  // ---- Meal Plan ----
  writeLine("WEEKLY MEAL PLAN", { size: 11, bold: true, color: [31, 75, 143] });
  y += 3;

  const calorieProfile = result.calorieProfile;
  Object.entries(result.plan).forEach(([day, meals]) => {
    checkPage(30);
    writeLine(day.toUpperCase(), { size: 11, bold: true, color: [20, 20, 20] });
    y += 1;
    drawRule(0.2, 200);
    let dayTotal = 0;
    Object.entries(meals).forEach(([mealName, suggestion]) => {
      const est = calorieProfile[mealName] ?? 500;
      const portion = PORTION_BY_MEAL[mealName] ?? "1 serving";
      dayTotal += est;
      writeLine(`${mealName}`, { size: 9, bold: true, color: [80, 80, 80], indent: 2 });
      y += 0.5;
      writeLine(suggestion, { size: 10, bold: false, color: [20, 20, 20], indent: 4 });
      writeLine(`Portion: ${portion}  |  Est. ${est} kcal`, { size: 8, color: [120, 120, 120], indent: 4 });
      y += 2;
    });
    writeLine(`Daily estimated total: ${dayTotal} kcal  (target: ${result.dailyTarget} kcal)`, { size: 8, bold: true, color: [31, 75, 143], indent: 2 });
    y += 5;
  });

  // ---- Grocery List ----
  checkPage(20);
  drawRule(0.5, 150);
  y += 2;
  writeLine("WEEKLY GROCERY LIST", { size: 11, bold: true, color: [31, 75, 143] });
  y += 3;

  const mergedGroceries = Object.assign({}, result.groceries);
  mergedGroceries.Other = [
    ...(result.groceries.Other || []),
    ...state.customGroceries.filter((item) => !(result.groceries.Other || []).includes(item))
  ];

  Object.entries(mergedGroceries).forEach(([category, items]) => {
    if (!items.length) return;
    checkPage(12);
    writeLine(category, { size: 10, bold: true, color: [40, 40, 40] });
    y += 1;
    [...items].sort().forEach((item) => {
      checkPage(6);
      writeLine(`• ${item}`, { size: 9, color: [50, 50, 50], indent: 3 });
    });
    y += 3;
  });

  // ---- Footer ----
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(`Your LC Meal Companion  |  Page ${i} of ${pageCount}`, margin, pageH - 8);
  }

    doc.save(`lc_meal_plan_${getTimestamp()}.pdf`);
  });
}

if (heroTitleEl && !heroTitleEl.textContent.trim()) {
  heroTitleEl.textContent = "Low-Carb Planner";
}

loadThemePreference();
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", toggleTheme);
}

loadPreferences();
updatePlanCountHint();
updateIosInstallHint();
setupInstallButtons();
updateBMI();
if (!String(dailyTargetEl.value).trim()) {
  autoFillCalories();
} else {
  updateRecommendedTargetText();
}

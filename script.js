// Supabase configuration - ADD THIS FIRST
const SUPABASE_URL = 'YOUR_PROJECT_LINK';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Emission factors database
const emissionFactors = {
    transport: {
        metro: 0.03,
        bus: 0.08,
        car: 0.12,
        motorcycle: 0.07,
        walk: 0
    },
    energy: {
        ac_1ton: 2.5,
        ac_1_5ton: 3.8,
        ac_2ton: 5.0,
        fan: 0.05,
        light: 0.03
    },
    food: {
        vegetarian: {
            base: 1.5,
            dal: 0.5,
            rice: 0.4,
            vegetables: 0.2,
            dairy: 0.9
        },
        nonvegetarian: {
            base: 3.2,
            chicken: 2.5,
            fish: 1.8,
            mutton: 8.0,
            eggs: 0.4
        },
        vegan: {
            base: 1.1,
            proteins: 1.2,
            plantMilk: 0.8
        }
    },
    digital: {
        phone: 0.01,
        laptop: 0.05
    },
    steps: -0.00002
};

// Facts database
const facts = {
    transport: {
        metro: "🚇 Delhi Metro saves 6.3 lakh tons of CO₂ annually - that's like planting 2.5 crore trees!",
        bus: "🚌 Did you know? A single bus can replace 40 cars on the road, reducing traffic and emissions!",
        car: "🚗 Reality check: Your car emits 4.6 tons of CO₂ per year - equivalent to burning 2,000 liters of petrol!",
        motorcycle: "🏍️ Bike fact: Two-wheelers produce 60% less CO₂ than cars, but still 3x more than public transport!",
        walk: "🚶‍♀️ Walking hero! You're literally carbon-negative when you walk. Every step fights climate change!"
    },
    energy: {
        ac_1ton: "❄️ AC Truth: Your 1-ton AC consumes about 1000 watts - same as 20 LED bulbs running together!",
        ac_1_5ton: "🌡️ Cool fact: Raising AC temp by 1°C can reduce electricity consumption by 6%!",
        ac_2ton: "🧊 Big AC energy! Your 2-ton AC uses more power than 5 average Indian homes combined!",
        none: "🌿 AC-free warrior! You're saving 2-3 kg CO₂ daily just by not using AC!"
    },
    digital: {
        low: "📱 Digital minimalist! Your screen time is lower than 80% of people your age!",
        medium: "📱 Average digital citizen! Most people spend 7+ hours on screens daily.",
        high: "📱 Screen time champion! You're spending more time with devices than sleeping!"
    },
    steps: {
        low: "🚶‍♀️ Step it up! WHO recommends 10,000 steps daily for good health and planet.",
        medium: "👟 Good walking! You're hitting decent daily activity levels.",
        high: "🏃‍♀️ Step royalty! You're walking more than 99% of people. Your feet are literally fighting climate change!"
    },
    diet: {
        vegetarian: "🌱 Veggie power: Vegetarians have 50% lower carbon footprint than meat-eaters!",
        nonvegetarian: "🍖 Meat reality: 1kg beef = 60kg CO₂ emissions (same as driving 230km)!",
        vegan: "🌿 Vegan impact: Plant-based diet can reduce your food footprint by 73%!"
    }
};

// GenZ suggestions database
const suggestions = {
    transport_heavy: [
        {
            title: "🚇 Metro Glow-Up",
            description: "Switch to Metro 2 days/week and save 1.2kg CO₂ daily. That's like planting 20 trees monthly! Plus, you'll get those steps in 💪",
            impact: "Save 1.2kg CO₂ daily"
        },
        {
            title: "🚶‍♀️ Walking Era",
            description: "Walk/cycle for trips under 3km. You'll be that person who actually hits their step goals AND saves the planet. Win-win energy! ✨",
            impact: "Save 0.8kg CO₂ + health boost"
        }
    ],
    energy_heavy: [
        {
            title: "❄️ AC Hack",
            description: "Set AC to 24°C instead of 18°C. You'll still be cool but your carbon footprint will be cooler. Save 0.8kg CO₂ daily! 🌡️",
            impact: "Save 0.8kg CO₂ daily"
        },
        {
            title: "💡 LED Main Character",
            description: "Switch to LED lights and become the energy-efficient icon you were meant to be. 75% less energy = more money for other things! 💰",
            impact: "Save 0.3kg CO₂ + ₹500/month"
        }
    ],
    food_heavy: [
        {
            title: "🌱 Meatless Monday Vibes",
            description: "Try 2 vegetarian days per week. You'll discover new foods AND reduce emissions by 2kg CO₂ weekly. Food blogger era! 📸",
            impact: "Save 2kg CO₂ weekly"
        },
        {
            title: "🥗 Local Food Hero",
            description: "Choose local/seasonal foods over imported ones. Support local farmers while cutting transport emissions. Community impact! 🏪",
            impact: "Save 0.5kg CO₂ + support locals"
        }
    ],
    digital_heavy: [
        {
            title: "📱 Digital Detox Queen",
            description: "Reduce screen time by 1 hour daily. Your eyes, sleep, and planet will thank you. Self-care meets planet-care! 🧘‍♀️",
            impact: "Save 0.1kg CO₂ + better sleep"
        },
        {
            title: "💻 Efficiency Mode",
            description: "Use power-saving mode on devices. Small change, big impact - like that friend who always has battery when everyone else is dead! 🔋",
            impact: "Save 0.05kg CO₂ + longer battery"
        }
    ]
};

function updateProgress() {
}


// Fact display functions
function showFact(category, value) {
    let factText = '';
    let factElement = '';
    
    // Determine which fact element to target
    switch(category) {
        case 'transport':
            factElement = 'transport-fact';
            break;
        case 'energy':
            factElement = 'energy-fact';
            break;
        case 'digital':
            factElement = 'digital-fact';
            break;
        case 'steps':
            factElement = 'steps-fact';
            break;
    }
    
    if (!factElement) return;
    
    // If no value selected, hide the fact div
    if (!value || value === '') {
        document.getElementById(factElement).style.display = 'none';
        document.getElementById(factElement).innerHTML = '';
        return;
    }
    
    // Determine fact text based on category and value
    switch(category) {
        case 'transport':
            factText = facts.transport[value] || '';
            break;
        case 'energy':
            factText = facts.energy[value] || '';
            break;
        case 'digital':
            const hours = parseInt(value);
            if (isNaN(hours)) {
                factText = '';
            } else if (hours <= 3) {
                factText = facts.digital.low;
            } else if (hours <= 7) {
                factText = facts.digital.medium;
            } else {
                factText = facts.digital.high;
            }
            break;
        case 'steps':
            const steps = parseInt(value);
            if (isNaN(steps)) {
                factText = '';
            } else if (steps < 5000) {
                factText = facts.steps.low;
            } else if (steps < 10000) {
                factText = facts.steps.medium;
            } else {
                factText = facts.steps.high;
            }
            break;
    }
    
    // Show or hide the fact div based on whether we have content
    if (factText) {
        let factDiv = document.getElementById(factElement);
        factDiv.innerHTML = factText;
        factDiv.style.display = 'block';
    } else {
        document.getElementById(factElement).style.display = 'none';
        document.getElementById(factElement).innerHTML = '';
    }
}

// Diet selection function
function selectDiet(dietType) {
    // Hide all diet options
    document.getElementById('vegetarianOptions').style.display = 'none';
    document.getElementById('nonvegetarianOptions').style.display = 'none';
    document.getElementById('veganOptions').style.display = 'none';
    
    // Show selected diet options
    if (dietType === 'vegetarian') {
        document.getElementById('vegetarianOptions').style.display = 'block';
    } else if (dietType === 'nonvegetarian') {
        document.getElementById('nonvegetarianOptions').style.display = 'block';
    } else if (dietType === 'vegan') {
        document.getElementById('veganOptions').style.display = 'block';
    }
    
    // Show diet fact div and set content
    const dietFactDiv = document.getElementById('diet-fact');
    if (dietType && dietFactDiv) {
        dietFactDiv.innerHTML = facts.diet[dietType];
        dietFactDiv.style.display = 'block';  // This line was missing!
    } else if (dietFactDiv) {
        dietFactDiv.style.display = 'none';
        dietFactDiv.innerHTML = '';
    }
}


// Main calculation function
async function calculateFootprint() {
    // Get all input values
    const inputs = getInputValues();
    
    // Calculate emissions by category
    const breakdown = calculateEmissions(inputs);
    
    // Calculate total emissions
    const totalEmissions = breakdown.transport + breakdown.energy + breakdown.food + breakdown.digital;
    
    // Calculate EcoScore
    const ecoScore = calculateEcoScore(totalEmissions, inputs);
    
    // Calculate trees needed
    const trees = calculateTrees(totalEmissions);

    // NEW: Save to Supabase
    try {
        const { data, error } = await supabase
            .from('carbon_footprint_records')
            .insert([
                {
                    // Transportation data
                    commute_mode: inputs.commuteMode,
                    commute_distance: inputs.commuteDistance,
                    personal_vehicle_type: inputs.personalVehicle,
                    personal_vehicle_distance: inputs.personalDistance,
                    
                    // Energy data
                    ac_type: inputs.acType,
                    ac_hours: inputs.acHours,
                    fan_count: inputs.fanCount,
                    fan_hours: inputs.fanHours,
                    light_count: inputs.lightCount,
                    light_hours: inputs.lightHours,
                    
                    // Food data
                    diet_type: inputs.dietType,
                    dal_frequency: getElementValue('vegDal'),
                    rice_frequency: getElementValue('vegRice'),
                    vegetables_frequency: getElementValue('vegVegetables'),
                    dairy_frequency: getElementValue('vegDairy'),
                    chicken_frequency: getElementValue('chicken'),
                    fish_frequency: getElementValue('fish'),
                    mutton_frequency: getElementValue('mutton'),
                    eggs_frequency: getElementValue('eggs'),
                    vegan_proteins_frequency: getElementValue('veganProteins'),
                    plant_milk_frequency: getElementValue('plantMilk'),
                    
                    // Digital data
                    phone_hours: inputs.phoneHours,
                    laptop_hours: inputs.laptopHours,
                    daily_steps: inputs.dailySteps,
                    
                    // Results
                    total_emissions: totalEmissions,
                    transport_emissions: breakdown.transport,
                    energy_emissions: breakdown.energy,
                    food_emissions: breakdown.food,
                    digital_emissions: breakdown.digital,
                    eco_score: ecoScore,
                    trees_daily: trees.daily,
                    trees_annual: trees.annual
                }
            ]);

        if (error) {
            console.error('Error saving to database:', error);
        } else {
            console.log('Data saved successfully:', data);
        }
    } catch (err) {
        console.error('Database connection error:', err);
    }
    
    // Display results
    displayResults(totalEmissions, ecoScore, trees, breakdown, inputs);
}


// Get all input values
function getInputValues() {
    return {
        commuteMode: document.getElementById('commuteMode').value,
        commuteDistance: parseFloat(document.getElementById('commuteDistance').value) || 0,
        personalVehicle: document.getElementById('personalVehicle').value,
        personalDistance: parseFloat(document.getElementById('personalDistance').value) || 0,
        acType: document.getElementById('acType').value,
        acHours: parseFloat(document.getElementById('acHours').value) || 0,
        fanCount: parseFloat(document.getElementById('fanCount').value) || 0,
        fanHours: parseFloat(document.getElementById('fanHours').value) || 0,
        lightCount: parseFloat(document.getElementById('lightCount').value) || 0,
        lightHours: parseFloat(document.getElementById('lightHours').value) || 0,
        dietType: document.querySelector('input[name="dietType"]:checked')?.value,
        phoneHours: parseFloat(document.getElementById('phoneHours').value) || 0,
        laptopHours: parseFloat(document.getElementById('laptopHours').value) || 0,
        dailySteps: parseFloat(document.getElementById('dailySteps').value) || 0
    };
}

// Calculate emissions by category
function calculateEmissions(inputs) {
    let breakdown = {
        transport: 0,
        energy: 0,
        food: 0,
        digital: 0
    };

    // Transport emissions
    if (inputs.commuteMode && inputs.commuteDistance) {
        breakdown.transport += emissionFactors.transport[inputs.commuteMode] * inputs.commuteDistance;
    }
    if (inputs.personalVehicle && inputs.personalVehicle !== 'none' && inputs.personalDistance) {
        breakdown.transport += emissionFactors.transport[inputs.personalVehicle] * inputs.personalDistance;
    }

    // Energy emissions
    if (inputs.acType && inputs.acType !== 'none' && inputs.acHours) {
        breakdown.energy += emissionFactors.energy[inputs.acType] * inputs.acHours;
    }
    breakdown.energy += inputs.fanCount * inputs.fanHours * emissionFactors.energy.fan;
    breakdown.energy += inputs.lightCount * inputs.lightHours * emissionFactors.energy.light;

    // Food emissions
    if (inputs.dietType) {
        breakdown.food += emissionFactors.food[inputs.dietType].base;
        
        if (inputs.dietType === 'vegetarian') {
            breakdown.food += getFoodEmissions('vegetarian', inputs);
        } else if (inputs.dietType === 'nonvegetarian') {
            breakdown.food += getFoodEmissions('nonvegetarian', inputs);
        } else if (inputs.dietType === 'vegan') {
            breakdown.food += getFoodEmissions('vegan', inputs);
        }
    }

    // Digital emissions
    breakdown.digital += inputs.phoneHours * emissionFactors.digital.phone;
    breakdown.digital += inputs.laptopHours * emissionFactors.digital.laptop;

    // Steps bonus (negative emissions)
    breakdown.digital += inputs.dailySteps * emissionFactors.steps;

    return breakdown;
}

// Get food-specific emissions
function getFoodEmissions(dietType, inputs) {
    let foodEmissions = 0;
    
    if (dietType === 'vegetarian') {
        foodEmissions += getElementValue('vegDal') * emissionFactors.food.vegetarian.dal / 7;
        foodEmissions += getElementValue('vegRice') * emissionFactors.food.vegetarian.rice / 7;
        foodEmissions += getElementValue('vegVegetables') * emissionFactors.food.vegetarian.vegetables / 7;
        foodEmissions += getElementValue('vegDairy') * emissionFactors.food.vegetarian.dairy / 7;
    } else if (dietType === 'nonvegetarian') {
        foodEmissions += getElementValue('chicken') * emissionFactors.food.nonvegetarian.chicken / 7;
        foodEmissions += getElementValue('fish') * emissionFactors.food.nonvegetarian.fish / 7;
        foodEmissions += getElementValue('mutton') * emissionFactors.food.nonvegetarian.mutton / 7;
        foodEmissions += getElementValue('eggs') * emissionFactors.food.nonvegetarian.eggs / 7;
    } else if (dietType === 'vegan') {
        foodEmissions += getElementValue('veganProteins') * emissionFactors.food.vegan.proteins / 7;
        foodEmissions += getElementValue('plantMilk') * emissionFactors.food.vegan.plantMilk / 7;
    }
    
    return foodEmissions;
}

// Helper function to get element value safely
function getElementValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? parseFloat(element.value) || 0 : 0;
}

// Calculate EcoScore
function calculateEcoScore(emissions, inputs) {
    let score = 100;
    
    // Deduct based on high emissions
    if (emissions > 8) score -= 30;
    else if (emissions > 6) score -= 25;
    else if (emissions > 4) score -= 15;
    else if (emissions > 3) score -= 5;
    
    // Add bonuses for eco-friendly choices
    if (inputs.dailySteps > 10000) score += 15;
    else if (inputs.dailySteps > 8000) score += 10;
    else if (inputs.dailySteps > 5000) score += 5;
    
    if (inputs.dietType === 'vegan') score += 20;
    else if (inputs.dietType === 'vegetarian') score += 15;
    
    if (inputs.commuteMode === 'metro' || inputs.commuteMode === 'bus') score += 10;
    if (inputs.commuteMode === 'walk') score += 20;
    
    if (inputs.acType === 'none') score += 10;
    
    return Math.max(0, Math.min(100, score));
}

// Calculate trees needed
function calculateTrees(dailyEmissions) {
    const treesDaily = Math.round(dailyEmissions / 0.06);
    const treesAnnual = treesDaily * 365;
    return { daily: treesDaily, annual: treesAnnual };
}

// Display results
function displayResults(emissions, ecoScore, trees, breakdown, inputs) {
    // Show results section
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

    // Display main metrics
    document.getElementById('scoreValue').textContent = ecoScore;
    document.getElementById('dailyEmissions').textContent = emissions.toFixed(1);
    document.getElementById('treesDaily').textContent = trees.daily;
    document.getElementById('treesAnnual').textContent = trees.annual.toLocaleString();

    // Display breakdown
    displayBreakdown(breakdown);

    // Display comparison fact
    displayComparisonFact(emissions);

    // Display suggestions
    displaySuggestions(breakdown, inputs);
}

// Display emissions breakdown
function displayBreakdown(breakdown) {
    const breakdownElement = document.getElementById('breakdown');
    if (breakdownElement) {
        breakdownElement.innerHTML = `
            Transport: ${breakdown.transport.toFixed(1)} kg<br>
            Energy: ${breakdown.energy.toFixed(1)} kg<br>
            Food: ${breakdown.food.toFixed(1)} kg<br>
            Digital & Steps: ${breakdown.digital.toFixed(1)} kg
        `;
    }
}

// Display comparison fact
function displayComparisonFact(emissions) {
    const comparisons = [
        `🎈 Your daily CO₂ = ${(emissions * 16.4).toFixed(0)} balloons filled with pure CO₂!`,
        `⚫ You're emitting the same as ${(emissions / 2.3).toFixed(1)} kg of coal burning!`,
        `📱 Your footprint = ${(emissions * 0.45).toFixed(0)} smartphones being manufactured daily!`,
        `📺 This equals ${(emissions / 0.6).toFixed(1)} hours of binge-watching Netflix!`,
        `🚗 Like driving a car ${(emissions * 8.3).toFixed(0)} km every single day!`
    ];
    
    const randomComparison = comparisons[Math.floor(Math.random() * comparisons.length)];
    const element = document.getElementById('comparisonFact');
    if (element) {
        element.innerHTML = randomComparison;
    }
}

// Display personalized suggestions
function displaySuggestions(breakdown, inputs) {
    const suggestionsElement = document.getElementById('suggestions');
    if (!suggestionsElement) return;
    
    let selectedSuggestions = [];
    
    // Find top emission sources and suggest accordingly
    if (breakdown.transport > 1.5) {
        selectedSuggestions.push(suggestions.transport_heavy[0]);
    }
    if (breakdown.energy > 2) {
        selectedSuggestions.push(suggestions.energy_heavy[0]);
    }
    if (breakdown.food > 3) {
        selectedSuggestions.push(suggestions.food_heavy[0]);
    }
    if (inputs.phoneHours > 6) {
        selectedSuggestions.push(suggestions.digital_heavy[0]);
    }
    
    // If no specific suggestions, add general ones
    if (selectedSuggestions.length === 0) {
        selectedSuggestions.push(
            suggestions.transport_heavy[0],
            suggestions.energy_heavy[0]
        );
    }
    
    // Take only first 2 suggestions
    selectedSuggestions = selectedSuggestions.slice(0, 2);
    
    // Display suggestions
    suggestionsElement.innerHTML = selectedSuggestions.map(suggestion => `
        <div>
            <strong>${suggestion.title}</strong><br>
            ${suggestion.description}<br>
            <em>${suggestion.impact}</em>
        </div>
    `).join('<br><br>');
}

// Clean initialization without defaults
window.onload = function() {
    console.log('CarbonCut loaded - ready for user input');
};


// AI Itinerary Generation Service
// Uses Claude API (via Anthropic) to generate travel itineraries
// Replace VITE_ANTHROPIC_API_KEY in .env with your key

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

export async function generateItinerary(tripData) {
  const { destination, startDate, endDate, budget, groupSize, travelStyle, dietary, interests } = tripData

  const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
  const budgetPerDay = Math.round(budget / days)

  const prompt = `You are an expert travel planner. Generate a detailed ${days}-day travel itinerary for ${destination}.

Trip Details:
- Duration: ${days} days (${startDate} to ${endDate})
- Total Budget: $${budget} USD (~$${budgetPerDay}/day)
- Group Size: ${groupSize} people
- Travel Style: ${travelStyle}
- Dietary Preferences: ${dietary || 'None specified'}
- Interests: ${interests || 'General sightseeing'}

Return ONLY valid JSON (no markdown, no backticks) with this exact structure:
{
  "destination": "${destination}",
  "summary": "2-3 sentence overview of the trip",
  "highlights": ["key highlight 1", "key highlight 2", "key highlight 3"],
  "accommodation": {
    "name": "Hotel/hostel name",
    "type": "hotel/hostel/airbnb",
    "pricePerNight": 80,
    "rating": 4.2,
    "amenities": ["WiFi", "Breakfast", "Pool"],
    "address": "Full address",
    "bookingUrl": "https://booking.com"
  },
  "budget": {
    "total": ${budget},
    "accommodation": 400,
    "food": 300,
    "activities": 200,
    "transport": 150,
    "misc": 50
  },
  "weather": {
    "temp": "25°C / 77°F",
    "condition": "Sunny with occasional clouds",
    "tip": "Pack light clothing and sunscreen"
  },
  "days": [
    {
      "day": 1,
      "date": "${startDate}",
      "title": "Day title",
      "morning": {
        "time": "9:00 AM",
        "activity": "Activity name",
        "description": "What to do and see",
        "duration": "2 hours",
        "cost": 15,
        "location": "Address or area",
        "tips": "Insider tip"
      },
      "afternoon": {
        "time": "1:00 PM",
        "activity": "Activity name",
        "description": "Description",
        "duration": "3 hours",
        "cost": 25,
        "location": "Location",
        "tips": "Tip"
      },
      "evening": {
        "time": "7:00 PM",
        "activity": "Dinner/Activity",
        "description": "Description",
        "duration": "2 hours",
        "cost": 30,
        "location": "Restaurant name and area",
        "tips": "Reservation recommended"
      },
      "lunch": {
        "restaurant": "Restaurant name",
        "cuisine": "Italian",
        "cost": 20,
        "address": "Address",
        "tip": "Try the local specialty"
      },
      "transport": {
        "mode": "Metro/Bus/Walk",
        "cost": 5,
        "tip": "Buy a day pass"
      },
      "totalDayCost": 95
    }
  ],
  "tips": ["Essential tip 1", "Essential tip 2", "Essential tip 3"],
  "emergencyContacts": {
    "police": "911",
    "ambulance": "911",
    "embassy": "+1-XXX-XXX-XXXX",
    "touristPolice": "Available 24/7"
  }
}`

  // Try Anthropic API
  if (ANTHROPIC_API_KEY) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const text = data.content[0].text
        const parsed = JSON.parse(text)
        return { ...parsed, id: Date.now().toString(), createdAt: new Date().toISOString(), ...tripData }
      }
    } catch (err) {
      console.warn('Anthropic API failed, using mock data', err)
    }
  }

  // Fallback: rich mock itinerary for demo
  return generateMockItinerary(tripData, days, budgetPerDay)
}

function generateMockItinerary(tripData, days, budgetPerDay) {
  const { destination, startDate, endDate, budget, groupSize, travelStyle } = tripData

  const mockDays = Array.from({ length: Math.min(days, 5) }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    return {
      day: i + 1,
      date: date.toISOString().split('T')[0],
      title: [`Arrival & First Impressions`, `Landmarks & Culture`, `Local Life & Markets`, `Hidden Gems`, `Final Day`][i],
      morning: {
        time: '9:00 AM',
        activity: [`Explore the Old Town`, `Visit the Main Cathedral`, `Morning Market Walk`, `Botanical Garden`, `Sunrise Viewpoint`][i],
        description: `Start your day exploring the best of ${destination} with this iconic experience.`,
        duration: '2-3 hours',
        cost: Math.round(budgetPerDay * 0.15),
        location: `City Center, ${destination}`,
        tips: 'Arrive early to beat the crowds and get the best photos.'
      },
      afternoon: {
        time: '2:00 PM',
        activity: [`Museum of History`, `Art Gallery Tour`, `Cooking Class`, `Scenic Hike`, `Souvenir Shopping`][i],
        description: `Immerse yourself in the local culture and traditions of ${destination}.`,
        duration: '3 hours',
        cost: Math.round(budgetPerDay * 0.25),
        location: `Downtown ${destination}`,
        tips: 'Book tickets online in advance to skip queues.'
      },
      evening: {
        time: '7:00 PM',
        activity: [`Welcome Dinner`, `Night Market`, `Rooftop Bar`, `Cultural Show`, `Farewell Dinner`][i],
        description: `End your day with a memorable evening experience in ${destination}.`,
        duration: '2-3 hours',
        cost: Math.round(budgetPerDay * 0.3),
        location: `Restaurant District, ${destination}`,
        tips: 'Make reservations for popular restaurants at least a day ahead.'
      },
      lunch: {
        restaurant: [`Café Central`, `The Local Kitchen`, `Street Food Alley`, `Garden Bistro`, `Harbor View`][i],
        cuisine: [`Local`, `Mediterranean`, `Street Food`, `International`, `Seafood`][i],
        cost: Math.round(budgetPerDay * 0.2),
        address: `Near ${destination} City Center`,
        tip: 'Try the daily special for the best value.'
      },
      transport: {
        mode: i === 0 ? 'Taxi from Airport' : 'Metro & Walking',
        cost: i === 0 ? 25 : 8,
        tip: i === 0 ? 'Use official airport taxi only' : 'Get a multi-day transit pass'
      },
      totalDayCost: budgetPerDay
    }
  })

  return {
    id: Date.now().toString(),
    destination,
    startDate,
    endDate,
    budget,
    groupSize,
    travelStyle,
    createdAt: new Date().toISOString(),
    summary: `An incredible ${days}-day journey through ${destination}, perfectly tailored for ${travelStyle} travelers. Experience the perfect blend of iconic landmarks, authentic local cuisine, and hidden gems.`,
    highlights: ['Iconic city landmarks', 'Authentic local cuisine', 'Cultural immersion experiences'],
    accommodation: {
      name: `${destination} Grand Hotel`,
      type: travelStyle === 'luxury' ? 'hotel' : 'boutique hotel',
      pricePerNight: Math.round(budget * 0.35 / days),
      rating: 4.3,
      amenities: ['Free WiFi', 'Breakfast Included', 'City View', 'Concierge'],
      address: `City Center, ${destination}`,
      bookingUrl: 'https://booking.com'
    },
    budget: {
      total: budget,
      accommodation: Math.round(budget * 0.35),
      food: Math.round(budget * 0.25),
      activities: Math.round(budget * 0.2),
      transport: Math.round(budget * 0.12),
      misc: Math.round(budget * 0.08)
    },
    weather: {
      temp: '22°C / 72°F',
      condition: 'Mostly sunny with light breeze',
      tip: 'Pack layers for evening — temperatures can drop after sunset.'
    },
    days: mockDays,
    tips: [
      'Download offline maps before your trip',
      'Keep a small amount of local currency for street vendors',
      'Learn a few basic phrases in the local language',
      'Travel insurance is highly recommended'
    ],
    emergencyContacts: {
      police: '112',
      ambulance: '112',
      embassy: 'Contact your country\'s foreign affairs dept',
      touristPolice: 'Available at major tourist areas'
    }
  }
}

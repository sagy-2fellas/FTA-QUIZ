// pages/api/subscribe.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, firstName, lastName, customFields } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Get list ID from environment (default to South Africa)
    // Can be extended to support country-based selection
    const LIST_ID = process.env.KLAVIYO_LIST_ID_SA || process.env.KLAVIYO_LIST_ID || "";
    const trimmedListId = (LIST_ID || "").trim();

    if (!trimmedListId) {
      console.error("[Klaviyo] Missing KLAVIYO_LIST_ID_SA or KLAVIYO_LIST_ID");
      return res.status(500).json({ error: "Server configuration error: Missing list ID" });
    }

    // Log subscription attempt (safe info only)
    console.log("[Klaviyo] Subscription attempt:", {
      email: email.substring(0, 3) + "***",
      hasFirstName: Boolean(firstName),
      hasLastName: Boolean(lastName),
      listId: trimmedListId,
      customFieldsCount: Object.keys(customFields || {}).length,
    });

    // Prepare Klaviyo client subscription payload
    // Uses JSON:API format required by Klaviyo
    const klaviyoPayload = {
      data: {
        type: "subscription",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: email,
                first_name: firstName || "",
                last_name: lastName || "",
                location: {
                  country: "South Africa",
                },
                properties: {
                  ...(customFields || {}),
                  quiz_completed: true,
                  quiz_completion_date: new Date().toISOString(),
                  source: "FTA Quiz Form",
                },
              },
            },
          },
          custom_source: "FTA Quiz",
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: trimmedListId,
            },
          },
        },
      },
    };

    // Call Klaviyo client subscription endpoint
    // NOTE: This endpoint does NOT require authentication
    // It's designed for client-side use and is unauthenticated
    const response = await fetch("https://a.klaviyo.com/client/subscriptions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify(klaviyoPayload),
    });

    // Parse response (may be empty for some status codes)
    let responseData = {};
    try {
      responseData = await response.json();
    } catch (parseError) {
      // Empty response is OK for 202 Accepted
      if (response.status === 202) {
        console.log("[Klaviyo] Subscription accepted for processing (202)");
      }
    }

    // Handle successful responses
    if (response.ok) {
      console.log("[Klaviyo] Subscription successful:", {
        status: response.status,
        email: email.substring(0, 3) + "***",
      });
      return res.status(200).json({
        success: true,
        message: "Successfully subscribed to the giveaway!",
      });
    }

    // Handle 409 Conflict - Profile already exists/subscribed
    // Treat this as success since user is already in the list
    if (response.status === 409) {
      console.log("[Klaviyo] Profile already subscribed (409):", {
        email: email.substring(0, 3) + "***",
      });
      return res.status(200).json({
        success: true,
        message: "You are already subscribed!",
      });
    }

    // Handle other errors
    console.error("[Klaviyo] Subscription failed:", {
      status: response.status,
      statusText: response.statusText,
      error: responseData?.errors?.[0]?.detail || responseData,
    });

    return res.status(response.status).json({
      error: responseData?.errors?.[0]?.detail || "Failed to subscribe. Please try again.",
      details: responseData,
    });
  } catch (error) {
    console.error("[Klaviyo] Server error:", error);
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
      details: error.message,
    });
  }
}

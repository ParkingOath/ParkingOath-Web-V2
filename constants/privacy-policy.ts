import type { LegalBlock } from "@/components/LegalDocument";

export const PRIVACY_POLICY: LegalBlock[] = [
  {
    "type": "h2",
    "text": "1. About this policy"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "This policy explains how Parking Oath Pty Ltd ABN 62 666 831 394 (“ParkingOath”, “we”, “us”) collects, uses, shares and protects personal information when you use the ParkingOath website (parkingoath.com.au), the ParkingOath mobile app and our related services (together, the “Platform”)."
      }
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We handle personal information in line with the "
      },
      {
        "t": "Privacy Act 1988",
        "i": true
      },
      {
        "t": " (Cth) and the Australian Privacy Principles. This policy is separate from, and should be read with, our "
      },
      {
        "t": "Terms of Service",
        "href": "/terms"
      },
      {
        "t": ". Words such as Host, Seeker, Driver, Booking and Property have the meanings given in the Terms of Service. In short, a "
      },
      {
        "t": "Seeker",
        "b": true
      },
      {
        "t": " is the account holder who makes a Booking, and a "
      },
      {
        "t": "Driver",
        "b": true
      },
      {
        "t": " is the person driving the booked vehicle."
      }
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "You must be 18 or over to hold a Host or Seeker account."
      }
    ]
  },
  {
    "type": "h2",
    "text": "2. Personal information we collect"
  },
  {
    "type": "h3",
    "text": "2.1 Information you give us"
  },
  {
    "type": "ul",
    "items": [
      [
        {
          "t": "Account details:",
          "b": true
        },
        {
          "t": " your first and last name, email address, mobile number, date of birth, address and password, or your Apple or Google account details if you sign in with them."
        }
      ],
      [
        {
          "t": "Identity verification:",
          "b": true
        },
        {
          "t": " to verify Drivers, we send you (in your device’s browser) to our verification provider, Didit. Didit collects an image of your identity document and a photo or video of your face directly from you and compares the two. Didit stores these verification records. We keep only the outcome: whether you are verified, the verification status, a Didit reference number and the date. We can view the verification records in Didit’s systems when we need to, for example to investigate suspected fraud or a dispute."
        }
      ],
      [
        {
          "t": "Vehicle details:",
          "b": true
        },
        {
          "t": " the registration number and state of the vehicle recorded against a Booking. We use the registration number to look up the vehicle’s make, model, body type and size from a vehicle data provider. This confirms what type of vehicle it is; it does not confirm who owns it."
        }
      ],
      [
        {
          "t": "Listing and Property details (Hosts):",
          "b": true
        },
        {
          "t": " the address and description of your space, photos, availability, pricing, access instructions and your acknowledgement that you have checked your insurance position."
        }
      ],
      [
        {
          "t": "Payment and payout details:",
          "b": true
        },
        {
          "t": " card payments are collected by our payment processor, Stripe. We do not store card numbers or security codes. Hosts provide bank account and identity details to Stripe so payouts can be made."
        }
      ],
      [
        {
          "t": "Photos and evidence:",
          "b": true
        },
        {
          "t": " photos you upload, including listing photos and photos or other evidence attached to a support ticket or claim."
        }
      ],
      [
        {
          "t": "Voice search:",
          "b": true
        },
        {
          "t": " when you use voice search, we record your spoken request so it can be converted to text and answered. Recording only happens while you are using voice search. The recording is deleted from our systems once your request has been answered, and we do not keep a history of your voice searches."
        }
      ],
      [
        {
          "t": "Messages, reviews and support:",
          "b": true
        },
        {
          "t": " messages you exchange with other members on the Platform, reviews and ratings, and support tickets and correspondence with us."
        }
      ],
      [
        {
          "t": "Claims information:",
          "b": true
        },
        {
          "t": " if you lodge or respond to a report or claim about a Booking, the details you provide, which may include quotes, photos and witness details."
        }
      ],
      [
        {
          "t": "Ambassador and referral details:",
          "b": true
        },
        {
          "t": " if you take part in our Ambassador program or invite friends, the details needed to send invitations, track referrals and pay rewards."
        }
      ]
    ]
  },
  {
    "type": "h3",
    "text": "2.2 Information collected automatically"
  },
  {
    "type": "ul",
    "items": [
      [
        {
          "t": "Location:",
          "b": true
        },
        {
          "t": " your device’s precise location when you allow it, used to show parking near you, give directions and pre-fill your address."
        }
      ],
      [
        {
          "t": "Device, usage and diagnostic information:",
          "b": true
        },
        {
          "t": " device type, operating system, app version, IP address, the features you use, crash reports and performance data."
        }
      ],
      [
        {
          "t": "Cookies and similar technologies (website):",
          "b": true
        },
        {
          "t": " used to keep you signed in, remember preferences and measure how our advertising performs. Our website uses the Meta Pixel and Meta’s Conversions API. When you visit the website or submit a form on it (for example, to register interest or contact us), we may share with Meta your IP address, browser information, Meta cookie identifiers and the pages or actions involved. If you submit a form, we may also share your email address and phone number in a hashed (scrambled) form. Meta uses this to measure and improve our advertising and may combine it with information it already holds about you. You can manage this through your browser’s cookie settings and your Meta ad preferences."
        }
      ]
    ]
  },
  {
    "type": "h3",
    "text": "2.3 Information from others"
  },
  {
    "type": "ul",
    "items": [
      [
        {
          "t": "From Didit, Stripe, and Apple or Google sign-in, as described above."
        }
      ],
      [
        {
          "t": "From our vehicle data provider, when it looks up vehicle details from a registration number."
        }
      ],
      [
        {
          "t": "From other members, for example when a Host lodges a report about a Booking, a Seeker provides details of an authorised Driver, or a member invites you to join ParkingOath."
        }
      ]
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "If you do not provide information we ask for, you may not be able to register, list a space, make a Booking or receive payouts."
      }
    ]
  },
  {
    "type": "h2",
    "text": "3. Sensitive information"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "Identity verification involves "
      },
      {
        "t": "biometric information",
        "b": true
      },
      {
        "t": " (the comparison of your face with your identity document), which is “sensitive information” under the Privacy Act. Didit collects and stores it on our behalf, only with your consent, and it is used only to verify your identity and to investigate fraud or disputes about it."
      }
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We do not ask for other sensitive information, such as health information. If you choose to include it in a message or support request, we will use it only to deal with that request."
      }
    ]
  },
  {
    "type": "h2",
    "text": "4. How we use personal information"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We use personal information to:"
      }
    ]
  },
  {
    "type": "ol",
    "items": [
      [
        {
          "t": "Create and manage your account and verify your identity."
        }
      ],
      [
        {
          "t": "Show listings, process Bookings and payments, and pay Hosts."
        }
      ],
      [
        {
          "t": "Calculate fees, commission, refunds and overstay charges."
        }
      ],
      [
        {
          "t": "Help members communicate about a Booking."
        }
      ],
      [
        {
          "t": "Handle support tickets, complaints, damage and injury reports, and disputes."
        }
      ],
      [
        {
          "t": "Detect and prevent fraud, misuse and breaches of our Terms of Service, and keep the Platform safe."
        }
      ],
      [
        {
          "t": "Meet our legal, tax and reporting obligations, including the Sharing Economy Reporting Regime."
        }
      ],
      [
        {
          "t": "Diagnose technical problems and improve the Platform."
        }
      ],
      [
        {
          "t": "Analyse how the Platform is used."
        }
      ],
      [
        {
          "t": "Send you service messages about your account and Bookings."
        }
      ],
      [
        {
          "t": "Send you marketing (see section 5)."
        }
      ]
    ]
  },
  {
    "type": "h2",
    "text": "5. Marketing"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We may send you news, offers and information about ParkingOath by email, SMS or push notification. You can opt out at any time using the unsubscribe link in an email, by replying STOP to an SMS, or in your notification settings. Service messages about your account and Bookings are not marketing and will still be sent."
      }
    ]
  },
  {
    "type": "h2",
    "text": "6. How we share personal information"
  },
  {
    "type": "h3",
    "text": "6.1 With other members"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "To make a Booking work, we share limited details between members:"
      }
    ]
  },
  {
    "type": "ul",
    "items": [
      [
        {
          "t": "Seekers see",
          "b": true
        },
        {
          "t": " the space’s address, its name (for example, “Garage”) and photos. Seekers do not see the Host’s name or phone number."
        }
      ],
      [
        {
          "t": "Hosts see",
          "b": true
        },
        {
          "t": " the name of the Seeker or Driver, the vehicle’s make and model, and its registration number, for Bookings of their space."
        }
      ]
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "Members may only use each other’s details for the Booking, for handling a dispute or for another lawful purpose. They must not use them for marketing."
      }
    ]
  },
  {
    "type": "h3",
    "text": "6.2 For damage, vehicle or injury claims"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "If a damage, vehicle or injury report is made about a Booking, we may share the other party’s name, contact details and relevant Booking evidence (including photos, timestamps and location records) with the person making the claim, their insurer or lawyer, or a court or tribunal."
      }
    ]
  },
  {
    "type": "h3",
    "text": "6.3 With our service providers"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We use trusted service providers who handle personal information on our behalf, only for the purposes in this policy:"
      }
    ]
  },
  {
    "type": "table",
    "header": [
      [
        {
          "t": "Provider"
        }
      ],
      [
        {
          "t": "What they do"
        }
      ]
    ],
    "rows": [
      [
        [
          {
            "t": "Stripe"
          }
        ],
        [
          {
            "t": "Card payments, refunds, Host payouts and Host identity checks for payouts"
          }
        ]
      ],
      [
        [
          {
            "t": "Didit"
          }
        ],
        [
          {
            "t": "Driver identity verification"
          }
        ]
      ],
      [
        [
          {
            "t": "Google (Firebase)"
          }
        ],
        [
          {
            "t": "Sign-in, data hosting and storage, push notifications, analytics and crash reporting"
          }
        ]
      ],
      [
        [
          {
            "t": "OpenAI"
          }
        ],
        [
          {
            "t": "Converting voice search requests to text, answering them and generating spoken responses"
          }
        ]
      ],
      [
        [
          {
            "t": "Resend"
          }
        ],
        [
          {
            "t": "Sending service emails, such as invitations and account notices"
          }
        ]
      ],
      [
        [
          {
            "t": "Help Scout"
          }
        ],
        [
          {
            "t": "Our support inbox and help tickets (including account deletion requests)"
          }
        ]
      ],
      [
        [
          {
            "t": "HubSpot"
          }
        ],
        [
          {
            "t": "Website enquiries and customer communications"
          }
        ]
      ],
      [
        [
          {
            "t": "Apple and Google"
          }
        ],
        [
          {
            "t": "Sign-in with your Apple or Google account, and maps and directions"
          }
        ]
      ],
      [
        [
          {
            "t": "RegCheck (regcheck.org.uk)"
          }
        ],
        [
          {
            "t": "Looking up vehicle make, model, body type and size from a registration number"
          }
        ]
      ],
      [
        [
          {
            "t": "Meta"
          }
        ],
        [
          {
            "t": "Measuring and improving our website advertising (Meta Pixel and Conversions API)"
          }
        ]
      ]
    ]
  },
  {
    "type": "h3",
    "text": "6.4 To government and for legal reasons"
  },
  {
    "type": "ul",
    "items": [
      [
        {
          "t": "Tax reporting:",
          "b": true
        },
        {
          "t": " under the Sharing Economy Reporting Regime, we must report information about Hosts and their transactions to the Australian Taxation Office. This may include legal name, date of birth, address, ABN, bank account details, phone number, email, property address, gross and net payments, fees and commission, GST, and booking periods."
        }
      ],
      [
        {
          "t": "Law enforcement and courts:",
          "b": true
        },
        {
          "t": " we may disclose information to courts, police, regulators or other authorities where required or permitted by law, to investigate unlawful activity, to enforce our Terms of Service, or to protect anyone’s rights or safety. Where appropriate and lawful, we will tell you about a legal request unless doing so would be ineffective or create a risk of harm or fraud."
        }
      ],
      [
        {
          "t": "Business changes:",
          "b": true
        },
        {
          "t": " if we sell or restructure our business, personal information may be transferred to the new owner, who must handle it in line with this policy."
        }
      ]
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We do not sell personal information. The ParkingOath app does not track you across other companies’ apps or websites. Our website uses Meta advertising tools as described in section 2.2."
      }
    ]
  },
  {
    "type": "h2",
    "text": "7. Overseas disclosure"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "Our main app data is hosted by Google Firebase in the United States. Some of our other service providers also store or process personal information outside Australia, including in the United States (Stripe, OpenAI, Resend, Help Scout, HubSpot, Meta) and the United Kingdom (RegCheck). Our identity verification provider, Didit, may also store and process verification records outside Australia. Before disclosing personal information overseas, we take reasonable steps to make sure the recipient handles it in a way consistent with the Australian Privacy Principles."
      }
    ]
  },
  {
    "type": "h2",
    "text": "8. Security"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We store personal information securely, with access limited to people who need it. Data is encrypted in transit. Card and bank details are held by Stripe, not by us. No system is completely secure, so please use a strong password and keep it private. If a data breach is likely to cause you serious harm, we will notify you and the Office of the Australian Information Commissioner as required by the Notifiable Data Breaches scheme."
      }
    ]
  },
  {
    "type": "h2",
    "text": "9. How long we keep information"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We keep personal information while your account is open and for as long as we need it for the purposes in this policy. After that, we delete or de-identify it, except where we need to keep it:"
      }
    ]
  },
  {
    "type": "ul",
    "items": [
      [
        {
          "t": "to meet tax, accounting and reporting obligations: transaction, payout and Sharing Economy Reporting Regime records are generally kept for "
        },
        {
          "t": "five years",
          "b": true
        },
        {
          "t": ";"
        }
      ],
      [
        {
          "t": "to resolve an open dispute, claim or investigation, until it is finished; or"
        }
      ],
      [
        {
          "t": "to enforce our Terms of Service or as otherwise required by law."
        }
      ]
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "Identity verification records are held by Didit for the period set in our arrangement with Didit, and no longer than needed to verify identity and to deal with fraud or disputes. Voice recordings are deleted once your request has been answered."
      }
    ]
  },
  {
    "type": "h2",
    "text": "10. Accessing, correcting and deleting your information"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "You can view and update most of your details in the app. Your name is locked after your account is set up; to correct it, contact us (section 13). You can also ask us for access to, or correction of, the personal information we hold about you."
      }
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "You can request deletion of your account in the app (Profile > Settings > Delete account) or at "
      },
      {
        "t": "parkingoath.com.au/delete-account",
        "href": "/delete-account"
      },
      {
        "t": ". When you delete your account, we close it and delete or de-identify your personal information within 30 days of your request, and email you when it is done, "
      },
      {
        "t": "except records we must keep by law",
        "b": true
      },
      {
        "t": " (see section 9), such as booking, payment and tax records. Your obligations under our Terms of Service that survive account closure continue to apply."
      }
    ]
  },
  {
    "type": "h2",
    "text": "11. Children"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "The Platform is for people aged 18 and over. We do not knowingly collect personal information from children. If you believe a child has given us personal information, please contact us."
      }
    ]
  },
  {
    "type": "h2",
    "text": "12. Changes to this policy"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "We may update this policy from time to time. We will post the updated version on the Platform with a new “Last updated” date and keep an archived copy of previous versions. If a change is significant, we will let you know in the app or by email."
      }
    ]
  },
  {
    "type": "h2",
    "text": "13. Contact us and complaints"
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "Privacy Officer, Parking Oath Pty Ltd",
        "b": true
      },
      {
        "t": " Registered office: C/- DKP & Co, Suite 2, Level 7, 520 Collins Street, Melbourne VIC 3000 Email: "
      },
      {
        "t": "apps@parkingoath.com",
        "href": "mailto:apps@parkingoath.com"
      }
    ]
  },
  {
    "type": "p",
    "runs": [
      {
        "t": "If you have a concern about how we have handled your personal information, please contact us first and we will respond within 30 days. If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner at "
      },
      {
        "t": "oaic.gov.au",
        "href": "https://www.oaic.gov.au"
      },
      {
        "t": "."
      }
    ]
  }
];

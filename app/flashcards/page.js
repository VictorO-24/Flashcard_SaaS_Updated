"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

import { CollectionReference, getDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"


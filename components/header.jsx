import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { checkUser } from '@/lib/checkUser';
import { ShieldCheck, Stethoscope, Calendar, User } from 'lucide-react';
import { checkAndAllocateCredits } from '@/actions/credits';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';


const Header = async () => {
  const user = await checkUser();
  if (user?.role === "PATIENT") {
    await checkAndAllocateCredits(user);
  }


  return <header className="fixed top-2 w-full h-18 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 z-50">
    <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
            <Image src="/logo3.avif" alt="Medico Friend" width={200} height={400} className="h-16 w-auto object-contain" />
        </Link>

        <div className='flex items-center space-x-4'>

          <SignedIn>
            {/* Admin Links */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Doctor Links */}
            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Stethoscope className="h-4 w-4" />
                  Doctor Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Patient Links */}
            {user?.role === "PATIENT" && (
              <>
                <Link href="/checker">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                  >
                    <Stethoscope className="h-4 w-4" />
                    Symptom Checker
                  </Button>
                </Link>

                <Link href="/appointments">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    My Appointments
                  </Button>
                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}

            {/* Unassigned Role */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          {(!user || user?.role !== "ADMIN") && (
            <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
              <Badge
                className="h-9 bg-blue-900/40 border-blue-700/60 px-3 py-1 flex items-center gap-2"
              >
                <CreditCard className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-white-500 font-bold">
                  {user && user.role !== "ADMIN" ? (
                    <>
                      {user.credits}{" "}
                      <span className="hidden md:inline">
                        {user?.role === "PATIENT"
                          ? "Credits"
                          : "Earned Credits"}
                      </span>
                    </>
                  ) : (
                    <>Pricing</>
                  )}
                </span>
              </Badge>
            </Link>
          )}

          <SignedOut>
              <SignInButton>
                <Button variant="secondary" className={"cursor-pointer"}>Sign In</Button>
                </SignInButton>
              <SignUpButton>
                <Button variant= "default" className={"cursor-pointer"}>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "bg-black rounded-lg shadow-md",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }} />
            </SignedIn>
        </div>
    </nav>
  </header>
}

export default Header
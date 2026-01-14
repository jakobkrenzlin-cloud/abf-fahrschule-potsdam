import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  license_class: string | null;
  email: string | null;
  source: string | null;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    // Server-side admin verification via edge function
    try {
      const response = await fetch(
        'https://jxxhrldcmwjnjqfpfeti.supabase.co/functions/v1/verify-admin',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          // Token expired or invalid, redirect to auth
          navigate('/auth');
          return;
        }
        if (response.status === 403) {
          // Not an admin
          setHasAccess(false);
          setLoading(false);
          return;
        }
        // Other errors
        console.error('Admin verification failed:', errorData);
        setHasAccess(false);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (!data.isAdmin) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      setHasAccess(true);
      fetchLeads();
    } catch (error) {
      // Network error or other issues
      if (import.meta.env.DEV) {
        console.error('Admin verification error:', error);
      }
      setHasAccess(false);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Don't log detailed errors in production - they expose schema details
        if (import.meta.env.DEV) {
          console.error('Error fetching leads:', error);
        }
      } else {
        setLeads(data || []);
      }
    } catch (error) {
      // Don't log detailed errors in production
      if (import.meta.env.DEV) {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Lade Kontaktanfragen...</p>
        </div>
      </div>
    );
  }

  if (hasAccess === false) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-destructive mb-4">
              Zugriff verweigert. Sie benötigen Admin-Rechte.
            </p>
            <Button onClick={handleLogout}>Abmelden</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Kontaktanfragen ({leads.length})
          </h1>
          <Button onClick={handleLogout} variant="outline">
            Abmelden
          </Button>
        </div>
        
        {leads.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground">
                Noch keine Kontaktanfragen eingegangen.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => (
              <Card key={lead.id} className="border-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{lead.name || 'Unbekannt'}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Telefon:</p>
                      <p className="text-lg">{lead.phone || 'Nicht angegeben'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Führerscheinklasse:</p>
                      <p className="text-lg">{lead.license_class || 'Nicht angegeben'}</p>
                    </div>
                    {lead.email && (
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">E-Mail:</p>
                        <p className="text-lg">{lead.email}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Quelle:</p>
                      <p className="text-lg">{lead.source || 'Unbekannt'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
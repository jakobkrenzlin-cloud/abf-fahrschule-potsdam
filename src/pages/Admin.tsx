import React, { useEffect, useState } from 'react';
import { supabase, ContactSubmission } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, User, Calendar, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: "Fehler",
          description: "Kontaktformulare konnten nicht geladen werden.",
          variant: "destructive",
        });
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLicenseClassLabel = (licenseClass: string) => {
    const labels: { [key: string]: string } = {
      'b': 'Klasse B (PKW)',
      'a1': 'Klasse A1 (Motorrad 125ccm)',
      'a2': 'Klasse A2 (Motorrad 35kW)',
      'a': 'Klasse A (Motorrad unbegrenzt)',
      'be': 'Klasse BE (PKW + Anhänger)'
    };
    return labels[licenseClass] || licenseClass;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Lade Kontaktformulare...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kontaktformulare</h1>
            <p className="text-muted-foreground mt-2">
              Übersicht aller eingegangenen Anfragen
            </p>
          </div>
          <Button onClick={fetchSubmissions} variant="outline">
            Aktualisieren
          </Button>
        </div>

        <div className="mb-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {submissions.length} Anfragen insgesamt
          </Badge>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Noch keine Kontaktformulare eingegangen</p>
                <p className="text-sm mt-2">Neue Anfragen werden hier automatisch angezeigt</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    {submission.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a 
                      href={`tel:${submission.phone}`}
                      className="text-primary hover:underline"
                    >
                      {submission.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-muted-foreground" />
                    <span>{getLicenseClassLabel(submission.license_class)}</span>
                  </div>
                  
                  {submission.created_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(submission.created_at)}</span>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full"
                    >
                      <a href={`tel:${submission.phone}`}>
                        Zurückrufen
                      </a>
                    </Button>
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
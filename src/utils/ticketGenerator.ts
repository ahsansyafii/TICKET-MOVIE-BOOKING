import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BookingDetails as BookingDetailsType, PaymentMethod } from '../types';

export const generateTicketPDF = async (
  bookingDetails: BookingDetailsType,
  paymentMethod: PaymentMethod,
  bookingId: string
) => {
  // Create a temporary div for the ticket
  const ticketElement = document.createElement('div');
  ticketElement.style.position = 'absolute';
  ticketElement.style.left = '-9999px';
  ticketElement.style.width = '800px';
  ticketElement.style.backgroundColor = 'white';
  ticketElement.style.padding = '40px';
  ticketElement.style.fontFamily = 'Arial, sans-serif';

  const totalWithFees = bookingDetails.totalPrice + paymentMethod.adminFee;

  ticketElement.innerHTML = `
    <div style="border: 2px solid #2563eb; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px dashed #cbd5e1; padding-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
          <div style="width: 50px; height: 50px; background: #2563eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
            <span style="color: white; font-size: 24px; font-weight: bold;">🎬</span>
          </div>
          <h1 style="color: #1e293b; font-size: 32px; font-weight: bold; margin: 0;">CinemaBook</h1>
        </div>
        <h2 style="color: #059669; font-size: 24px; font-weight: bold; margin: 0;">MOVIE TICKET</h2>
        <p style="color: #64748b; font-size: 16px; margin: 5px 0 0 0;">Booking ID: ${bookingId}</p>
      </div>

      <!-- Movie Info -->
      <div style="display: flex; margin-bottom: 25px;">
        <div style="flex: 1;">
          <h3 style="color: #1e293b; font-size: 24px; font-weight: bold; margin: 0 0 10px 0;">${bookingDetails.movie?.title}</h3>
          <p style="color: #64748b; font-size: 16px; margin: 0 0 5px 0;"><strong>Genre:</strong> ${bookingDetails.movie?.genre}</p>
          <p style="color: #64748b; font-size: 16px; margin: 0 0 5px 0;"><strong>Duration:</strong> ${bookingDetails.movie?.duration}</p>
          <p style="color: #64748b; font-size: 16px; margin: 0;"><strong>Rating:</strong> ⭐ ${bookingDetails.movie?.rating}</p>
        </div>
      </div>

      <!-- Booking Details -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 25px;">
        <div>
          <h4 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Show Details</h4>
          <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0;"><strong>Date:</strong> ${bookingDetails.showTime?.date}</p>
          <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0;"><strong>Time:</strong> ${bookingDetails.showTime?.time}</p>
          <p style="color: #64748b; font-size: 14px; margin: 0;"><strong>Studio:</strong> ${bookingDetails.studio?.name}</p>
        </div>
        <div>
          <h4 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Customer Info</h4>
          <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0;"><strong>Email:</strong> ${bookingDetails.userEmail}</p>
          <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0;"><strong>Payment:</strong> ${paymentMethod.name}</p>
          <p style="color: #64748b; font-size: 14px; margin: 0;"><strong>Seats:</strong> ${bookingDetails.selectedSeats.map(seat => seat.id).join(', ')}</p>
        </div>
      </div>

      <!-- Seats -->
      <div style="margin-bottom: 25px;">
        <h4 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Selected Seats</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${bookingDetails.selectedSeats.map(seat => 
            `<span style="background: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">${seat.id}</span>`
          ).join('')}
        </div>
      </div>

      <!-- Price Breakdown -->
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h4 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">Price Breakdown</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #64748b; font-size: 14px;">Tickets (${bookingDetails.selectedSeats.length})</span>
          <span style="color: #1e293b; font-weight: 600; font-size: 14px;">$${bookingDetails.totalPrice}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="color: #64748b; font-size: 14px;">Admin Fee (${paymentMethod.name})</span>
          <span style="color: #1e293b; font-weight: 600; font-size: 14px;">$${paymentMethod.adminFee}</span>
        </div>
        <div style="border-top: 1px solid #cbd5e1; padding-top: 10px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #1e293b; font-size: 18px; font-weight: bold;">Total Paid</span>
            <span style="color: #2563eb; font-size: 18px; font-weight: bold;">$${totalWithFees}</span>
          </div>
        </div>
      </div>

      <!-- QR Code Placeholder -->
      <div style="text-align: center; margin-bottom: 25px;">
        <div style="width: 120px; height: 120px; background: #e2e8f0; border: 2px dashed #94a3b8; margin: 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
          <span style="color: #64748b; font-size: 12px; text-align: center;">QR Code<br/>for Entry</span>
        </div>
      </div>

      <!-- Important Notes -->
      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px;">
        <h4 style="color: #92400e; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">Important Information</h4>
        <ul style="color: #92400e; font-size: 12px; margin: 0; padding-left: 20px;">
          <li>Please arrive at least 15 minutes before show time</li>
          <li>Bring a valid ID for verification</li>
          <li>This ticket is non-refundable and non-transferable</li>
          <li>Present this ticket (digital or printed) at the cinema entrance</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 2px dashed #cbd5e1;">
        <p style="color: #64748b; font-size: 12px; margin: 0;">Generated on ${new Date().toLocaleString()}</p>
        <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">© 2024 CinemaBook. All rights reserved.</p>
      </div>
    </div>
  `;

  document.body.appendChild(ticketElement);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(ticketElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const x = (210 - imgWidth) / 2; // Center horizontally
    const y = 10;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgWidth, imgHeight);

    // Download the PDF
    pdf.save(`CinemaBook-Ticket-${bookingId}.pdf`);
  } catch (error) {
    console.error('Error generating ticket:', error);
    alert('Error generating ticket. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(ticketElement);
  }
};

export const downloadTicketAsImage = async (
  bookingDetails: BookingDetailsType,
  paymentMethod: PaymentMethod,
  bookingId: string
) => {
  // Create a temporary div for the ticket
  const ticketElement = document.createElement('div');
  ticketElement.style.position = 'absolute';
  ticketElement.style.left = '-9999px';
  ticketElement.style.width = '600px';
  ticketElement.style.backgroundColor = 'white';
  ticketElement.style.padding = '30px';
  ticketElement.style.fontFamily = 'Arial, sans-serif';

  const totalWithFees = bookingDetails.totalPrice + paymentMethod.adminFee;

  ticketElement.innerHTML = `
    <div style="border: 2px solid #2563eb; border-radius: 12px; padding: 25px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px dashed #cbd5e1; padding-bottom: 15px;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
          <div style="width: 40px; height: 40px; background: #2563eb; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
            <span style="color: white; font-size: 20px; font-weight: bold;">🎬</span>
          </div>
          <h1 style="color: #1e293b; font-size: 24px; font-weight: bold; margin: 0;">CinemaBook</h1>
        </div>
        <h2 style="color: #059669; font-size: 18px; font-weight: bold; margin: 0;">MOVIE TICKET</h2>
        <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">Booking ID: ${bookingId}</p>
      </div>

      <!-- Movie Info -->
      <div style="margin-bottom: 20px;">
        <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0 0 8px 0;">${bookingDetails.movie?.title}</h3>
        <p style="color: #64748b; font-size: 12px; margin: 0 0 3px 0;"><strong>Genre:</strong> ${bookingDetails.movie?.genre}</p>
        <p style="color: #64748b; font-size: 12px; margin: 0 0 3px 0;"><strong>Duration:</strong> ${bookingDetails.movie?.duration}</p>
        <p style="color: #64748b; font-size: 12px; margin: 0;"><strong>Rating:</strong> ⭐ ${bookingDetails.movie?.rating}</p>
      </div>

      <!-- Booking Details -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
        <div>
          <h4 style="color: #1e293b; font-size: 14px; font-weight: bold; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px;">Show Details</h4>
          <p style="color: #64748b; font-size: 11px; margin: 0 0 5px 0;"><strong>Date:</strong> ${bookingDetails.showTime?.date}</p>
          <p style="color: #64748b; font-size: 11px; margin: 0 0 5px 0;"><strong>Time:</strong> ${bookingDetails.showTime?.time}</p>
          <p style="color: #64748b; font-size: 11px; margin: 0;"><strong>Studio:</strong> ${bookingDetails.studio?.name}</p>
        </div>
        <div>
          <h4 style="color: #1e293b; font-size: 14px; font-weight: bold; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px;">Customer Info</h4>
          <p style="color: #64748b; font-size: 11px; margin: 0 0 5px 0;"><strong>Email:</strong> ${bookingDetails.userEmail}</p>
          <p style="color: #64748b; font-size: 11px; margin: 0 0 5px 0;"><strong>Payment:</strong> ${paymentMethod.name}</p>
          <p style="color: #64748b; font-size: 11px; margin: 0;"><strong>Total:</strong> $${totalWithFees}</p>
        </div>
      </div>

      <!-- Seats -->
      <div style="margin-bottom: 20px;">
        <h4 style="color: #1e293b; font-size: 14px; font-weight: bold; margin: 0 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px;">Selected Seats</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
          ${bookingDetails.selectedSeats.map(seat => 
            `<span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 15px; font-size: 11px; font-weight: 600;">${seat.id}</span>`
          ).join('')}
        </div>
      </div>

      <!-- QR Code Placeholder -->
      <div style="text-align: center; margin-bottom: 15px;">
        <div style="width: 80px; height: 80px; background: #e2e8f0; border: 2px dashed #94a3b8; margin: 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 6px;">
          <span style="color: #64748b; font-size: 10px; text-align: center;">QR Code<br/>for Entry</span>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 15px; border-top: 2px dashed #cbd5e1;">
        <p style="color: #64748b; font-size: 10px; margin: 0;">Please arrive 15 minutes early • Bring valid ID</p>
        <p style="color: #64748b; font-size: 10px; margin: 3px 0 0 0;">© 2024 CinemaBook. All rights reserved.</p>
      </div>
    </div>
  `;

  document.body.appendChild(ticketElement);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(ticketElement, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `CinemaBook-Ticket-${bookingId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error generating ticket image:', error);
    alert('Error generating ticket. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(ticketElement);
  }
};
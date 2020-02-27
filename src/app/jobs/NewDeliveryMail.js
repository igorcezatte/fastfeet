import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `New delivery available`,
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
        recipientName: recipient.name,
        recipientUF: recipient.uf,
        recipientCity: recipient.city,
        recipientNeighborhood: recipient.neighborhood,
        recipientStreet: recipient.street,
        recipientNumber: recipient.number,
        recipientComplement: recipient.complement,
      },
    });
  }
}

export default new NewDeliveryMail();

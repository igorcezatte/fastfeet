import Mail from '../../lib/Mail';

class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, delivery, problem } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Delivery canceled`,
      template: 'cancelDelivery',
      context: {
        deliveryman: deliveryman.name,
        deliveryId: delivery.id,
        description: problem.description,
      },
    });
  }
}

export default new CancelDeliveryMail();

/*
// @ts-ignore
const stripe = Stripe('pk_live_51KB4AqHzyheHHaqUoqrzwi45kotoqE7VjW7mK4DK9vgYv4mJuRFuC4jqaj0O7hcQWJq7IZqwQ0tDrFPlS4vGTr0B00ge6YWXUI');
const elements = stripe.elements();

var style = {
    base: {
        color: "#fff"
    }
}
const card = elements.create('card', { style });
card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    console.log(form)
    form.submit();
}

form.addEventListener('submit', e => {
    e.preventDefault();

    stripe.createToken(card).then(res => {
        if (res.error) errorEl.textContent = res.error.message;
        else {
            console.log(res.token)
            stripeTokenHandler(res.token);
        }
    })
}) */
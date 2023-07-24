
    // JavaScript code to handle the poll

    // Function to get the number of votes from Local Storage
    function getVotes() {
        return parseInt(localStorage.getItem('pollVotes')) || 0;
      }
  
      // Function to set the number of votes to Local Storage
      function setVotes(votes) {
        localStorage.setItem('pollVotes', votes);
      }
  
      // Function to check if the user has already voted
      function hasVoted() {
        return localStorage.getItem('hasVoted') === 'true';
      }
  
      // Function to set that the user has voted
      function setVoted() {
        localStorage.setItem('hasVoted', 'true');
      }
  
      function updateProgressBar() {
        const totalVotes = getVotes();
        const voteOptions = document.querySelectorAll('input[name="pollOption"]');
        voteOptions.forEach((option, index) => {
          const optionVotes = parseInt(localStorage.getItem(`pollVotes${index + 1}`)) || 0;
          const percentage = totalVotes === 0 ? 0 : (optionVotes / totalVotes) * 100;
          const progressBar = document.getElementById(`progress${index + 1}`);
          progressBar.style.width = percentage + '%';
        });
      }
  
      function submitVote() {
        // Check if the user has already voted
        if (hasVoted()) {
          alert('You have already voted. Thank you for your participation.');
          return;
        }
  
        const selectedOption = document.querySelector('input[name="pollOption"]:checked');
  
        if (!selectedOption) {
          alert('Please select an option before voting.');
          return;
        }
  
        const vote = selectedOption.value;
        alert('Thank you for voting! You selected: ' + vote);
  
        // Retrieve previous vote count from Local Storage
        let previousVotes = getVotes();
  
        // Increment the vote count and display it on the page
        const newVotes = previousVotes + 1;
        document.getElementById('result').textContent = newVotes + ' votes polled';
  
        // Save the updated vote count to Local Storage
        setVotes(newVotes);
  
        // Set that the user has voted
        setVoted();
  
        // Disable the voting options and button after voting
        const voteOptions = document.querySelectorAll('input[name="pollOption"]');
        const voteBtn = document.getElementById('voteBtn');
        voteOptions.forEach(option => option.disabled = true);
        voteBtn.disabled = true;
  
        // Redirect to Google in the same window if "Yes" option is selected
        if (vote === 'Yes') {
          window.location.href = 'https://www.google.com';
        }
  
        // Update the progress bar after each vote
        updateProgressBar();
      }
  
      // Display the initial vote count and progress bar on page load
      document.addEventListener('DOMContentLoaded', function () {
        const initialVotes = getVotes();
        document.getElementById('result').textContent = initialVotes + ' votes polled';
  
        // Check if the user has already voted on page load
        if (hasVoted()) {
          const voteOptions = document.querySelectorAll('input[name="pollOption"]');
          const voteBtn = document.getElementById('voteBtn');
          voteOptions.forEach(option => option.disabled = true);
          voteBtn.disabled = true;
        }
  
        // Update the progress bar on page load
        updateProgressBar();
      });